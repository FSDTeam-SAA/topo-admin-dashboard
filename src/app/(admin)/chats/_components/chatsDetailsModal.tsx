'use client'

import { useEffect, useRef } from 'react'
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
import { useChatStore } from '@/store/useChatStore'

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

interface ChatsDetailsPopupProps {
  conversation: Conversation
  children: React.ReactNode
}

export function ChatsDetailsPopup({
  conversation,
  children,
}: ChatsDetailsPopupProps) {
  const {
    messages,
    fetchMessages,
    reset,
    isLoading,
    isFetchingMore,
    error,
    hasMore,
    page,
  } = useChatStore()

  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken || ''
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom after loading
  useEffect(() => {
    if (!isFetchingMore && messages.length > 0) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [messages.length, isFetchingMore])

  const handleOpenChange = (open: boolean) => {
    if (open) {
      reset()
      fetchMessages(conversation._id, accessToken, 1)
    }
  }

  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore) {
      fetchMessages(conversation._id, accessToken, page + 1, true)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderAttachment = (attachment: any) => {
    const { url, type, fileName } = attachment

    if (type === 'image') {
      return (
        <div className="mt-2 relative">
          <Image
            src={url}
            alt={fileName}
            width={200}
            height={200}
            className="rounded-xl max-w-[280px] object-cover"
            style={{ width: '100%', height: '250px' }}
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
        <DialogHeader>
          <div className="flex justify-center mb-7 mt-6">
            <Image
              src="/logo.png"
              alt="Chat Details"
              width={100}
              height={100}
              priority
            />
          </div>
          <div className="flex justify-start">
            <span className="text-lg font-light">
              <strong className="font-normal">Conversation ID:</strong>{' '}
              {conversation._id}
            </span>
          </div>
        </DialogHeader>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light">
              Conversation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 font-light">
            <p>
              <strong>Booking ID:</strong> {conversation.bookingId || 'N/A'}
            </p>
            <p>
              <strong>Customer ID:</strong> {conversation.customerId || 'N/A'}
            </p>
            <p>
              <strong>Lender ID:</strong> {conversation.lenderId || 'N/A'}
            </p>
            <p>
              <strong>Customer Name:</strong>{' '}
              {conversation.customerName || 'N/A'}
            </p>
            <p>
              <strong>Lender Name:</strong> {conversation.lenderName || 'N/A'}
            </p>
            <p>
              <strong>Status:</strong>{' '}
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

        {/* Messages */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light">Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="w-full h-[500px] overflow-y-auto p-4 bg-white border rounded-lg">
              {isLoading ? (
                <div className="flex justify-center font-light  items-center h-full text-sm text-gray-500">
                  Loading messages...
                </div>
              ) : error ? (
                <div className="flex flex-col justify-center items-center h-full text-sm text-red-500">
                  {error}
                  <Button
                    onClick={() =>
                      fetchMessages(conversation._id, accessToken, 1)
                    }
                    size="sm"
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                  No messages found.
                </div>
              ) : (
                <>
                  {hasMore && (
                    <div className="flex justify-center mb-3">
                      <Button
                        onClick={handleLoadMore}
                        disabled={isFetchingMore}
                        size="sm"
                        variant="outline"
                        className="font-light text-sm rounded-3xl"
                      >
                        {isFetchingMore ? 'Loading...' : 'Load More Messages'}
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
                            className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                              isLender
                                ? 'bg-gray-200 text-gray-800 rounded-bl-none'
                                : 'bg-slate-700 text-white rounded-br-none'
                            }`}
                          >
                            <p className="text-xs mb-1 opacity-70 font-medium">
                              {isLender ? 'Lender' : 'Customer'}
                            </p>
                            {message.message && <p>{message.message}</p>}
                            {message.attachments?.map((a, i) => (
                              <div key={i}>{renderAttachment(a)}</div>
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
            <CardTitle className="text-lg font-light">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button className="font-normal">Flag Conversation</Button>
            <Button variant="secondary" className="font-normal">
              Close Conversation
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
