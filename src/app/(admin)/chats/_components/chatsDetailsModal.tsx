'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { File, Download } from 'lucide-react'
import { useSession } from 'next-auth/react'

// Types
export type Conversation = {
  _id: string
  bookingId: string
  customerId: string
  lenderId: string
  customerName: string
  lenderName: string
  date: string
  lastMessage?: string
  status?: string
}

interface Attachment {
  url: string
  type: string
  fileName: string
  size: number
  mimeType: string
}

interface Sender {
  _id: string
  firstName: string
  lastName: string
  profileImage?: string
  role?: 'USER' | 'LENDER'
}

interface Message {
  _id: string
  chatRoom: string
  sender: Sender
  message: string
  attachments: Attachment[]
  readBy: string[]
  createdAt: string
  updatedAt: string
}

interface MessageResponse {
  status: boolean
  message: string
  data: {
    messages: Message[]
    pagination: {
      total: number
      page: number
      limit: number
      pages: number
    }
  }
}

interface ChatsDetailsPopupProps {
  conversation: Conversation
  children: React.ReactNode
}

export function ChatsDetailsPopup({
  conversation,
  children,
}: ChatsDetailsPopupProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const session = useSession()
  const accessToken = session?.data?.user?.accessToken || ''

  // Fetch messages
  const fetchMessages = async (pageNum: number, isLoadMore = false) => {
    if (isLoadMore) {
      setIsFetchingMore(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      // const accessToken = localStorage.getItem('adminAccessToken') // Adjust based on your auth setup

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/message/${conversation._id}/?page=${pageNum}&limit=20`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )

      if (!res.ok) {
        throw new Error(`Failed to fetch messages: ${res.status}`)
      }

      const json: MessageResponse = await res.json()

      if (isLoadMore) {
        setMessages((prev) => [...json.data.messages, ...prev])
      } else {
        setMessages(json.data.messages.reverse() || [])
      }

      setHasMore(json.data.pagination.page < json.data.pagination.pages)
      setPage(json.data.pagination.page)
    } catch (err) {
      console.error('Error fetching messages:', err)
      setError('Failed to load messages. Please try again.')
    } finally {
      setIsLoading(false)
      setIsFetchingMore(false)
    }
  }

  // Initial fetch on dialog open
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setMessages([])
      setPage(1)
      setHasMore(false)
      fetchMessages(1)
    }
  }

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messages.length > 0 && !isFetchingMore) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [messages.length])

  // Load more messages
  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore) {
      fetchMessages(page + 1, true)
    }
  }

  // Render attachment
  const renderAttachment = (attachment: Attachment) => {
    const { url, type, fileName } = attachment

    if (type === 'image') {
      return (
        <div className="mt-2 relative group">
          <Image
            src={url}
            alt={fileName}
            width={200}
            height={200}
            className="rounded-xl max-w-[280px] cursor-pointer object-cover"
            style={{ width: '100%', height: 'auto' }}
            unoptimized={url.startsWith('blob:') || url.startsWith('data:')}
          />
        </div>
      )
    }

    if (type === 'video') {
      return (
        <div className="mt-2 rounded-xl overflow-hidden bg-black max-w-[280px]">
          <video controls className="w-full h-auto rounded-xl">
            <source src={url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }

    return (
      <div className="mt-2 flex items-center gap-2 p-2 text-gray-700 bg-gray-100 rounded-lg">
        <File className="h-5 w-5 text-gray-600" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{fileName}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Download
          </a>
        </div>
      </div>
    )
  }

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto p-3 py-8 space-y-4 font-sans">
        {/* Header */}
        <DialogHeader>
          <div className="flex justify-center mb-7 mt-6">
            <Image
              src="/logo.png"
              alt="Chat Details"
              width={100}
              height={100}
              priority
              className="object-contain"
              quality={100}
            />
          </div>
          <div className="flex justify-start">
            <span className="text-lg font-light tracking-wider">
              <strong className="font-normal">Conversation ID:</strong>{' '}
              {conversation._id}
            </span>
          </div>
        </DialogHeader>

        {/* Chat Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light tracking-wider">
              Conversation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 font-light tracking-wider">
            <p>
              <strong className="font-medium">Booking ID:</strong>{' '}
              {conversation.bookingId || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Customer ID:</strong>{' '}
              {conversation.customerId || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Lender ID:</strong>{' '}
              {conversation.lenderId || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Customer Name:</strong>{' '}
              {conversation.customerName || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Lender Name:</strong>{' '}
              {conversation.lenderName || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Status:</strong>{' '}
              <span
                className={`px-2 py-1 rounded text-xs ${
                  conversation.status === 'Active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {conversation.status || 'N/A'}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Messages Box */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light tracking-wider">
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div
              ref={containerRef}
              className="w-full h-[500px] overflow-y-auto p-4 bg-white border rounded-lg"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto mb-2"></div>
                    <Button
                      className="text-gray-500 text-sm"
                      onClick={() => setPage(page + 1)}
                    >
                      Loading messages...
                    </Button>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-red-500 text-sm mb-2">{error}</p>
                    <Button
                      onClick={() => fetchMessages(1)}
                      variant="outline"
                      size="sm"
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-gray-400 text-sm mb-2">
                      No messages yet
                    </p>
                    <p className="text-gray-400 text-xs">
                      This conversation has no messages
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  {hasMore && (
                    <div className="flex justify-center mb-4 sticky top-0 z-10">
                      <Button
                        onClick={handleLoadMore}
                        disabled={isFetchingMore}
                        variant="outline"
                        size="sm"
                        className="bg-slate-50 border-gray-200 rounded-full font-light text-xs hover:bg-slate-100/80 shadow-sm"
                      >
                        {isFetchingMore ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-800 mr-2"></div>
                            Loading...
                          </>
                        ) : (
                          'Load More Messages'
                        )}
                      </Button>
                    </div>
                  )}

                  <div className="flex flex-col gap-3">
                    {messages.map((message) => {
                      const isLender =
                        message.sender._id === conversation.lenderId
                      const messageDate = new Date(message.createdAt)
                      const time = messageDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })

                      return (
                        <div
                          key={message._id}
                          className={`flex ${
                            isLender ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                              isLender
                                ? 'bg-gray-200 text-gray-800 rounded-bl-none'
                                : 'bg-slate-700 text-white rounded-br-none'
                            }`}
                          >
                            <div className="mb-2">
                              <p className="text-[12px] font-medium opacity-70">
                                {isLender ? (
                                  <p>
                                    {/* {conversation.lenderName}{' '} */}
                                    <span className="text-base">Lender</span>
                                  </p>
                                ) : (
                                  // conversation.customerName
                                  <span className="text-sm">Customer</span>
                                )}
                              </p>
                            </div>

                            {message.message && (
                              <p className="break-words whitespace-pre-wrap">
                                {message.message}
                              </p>
                            )}

                            {message.attachments?.length > 0 &&
                              message.attachments.map((attachment, i) => (
                                <div key={i}>
                                  {renderAttachment(attachment)}
                                </div>
                              ))}

                            <p
                              className={`text-[10px] mt-1 text-right ${
                                isLender ? 'text-gray-500' : 'text-gray-300'
                              }`}
                            >
                              {time}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light tracking-wider">
              Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Flag Conversation</Button>
            <Button variant="secondary">Close Conversation</Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
