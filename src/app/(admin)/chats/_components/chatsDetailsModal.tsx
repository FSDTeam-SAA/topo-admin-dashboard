'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'

// ✅ Conversation type
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

// ✅ Props type
interface ChatsDetailsPopupProps {
  conversation: Conversation
  children: React.ReactNode
}

export function ChatsDetailsPopup({
  conversation,
  children,
}: ChatsDetailsPopupProps) {
  const [response, setResponse] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSave = () => {
    const payload = {
      chatId: conversation._id,
      bookingId: conversation.bookingId,
      response,
      status: conversation.status || 'N/A',
      file,
    }

    console.log('💬 Save Payload:', payload)
    toast.success('Chat details updated successfully (demo)')
  }

  console.log('cons', conversation)

  return (
    <Dialog>
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
              <strong className="font-medium">Conversation ID:</strong>{' '}
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
              <strong className="font-medium">Customer Name:</strong>{' '}
              {conversation.customerId || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Lender Name:</strong>{' '}
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
              {conversation.status || 'N/A'}
            </p>
            {/* <p>
              <strong className="font-medium">Created Date:</strong>{' '}
              {new Date(conversation.date).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
            <p>
              <strong className="font-medium">Last Message:</strong>{' '}
              {conversation.lastMessage || 'N/A'}
            </p> */}
          </CardContent>
        </Card>

        {/* Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Admin Intervention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Write your message..."
              rows={10}
            />

            {/* File Upload Row */}
            <div className="flex items-center gap-2">
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files ? e.target.files[0] : null)
                }
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <Button
                className="whitespace-nowrap"
                onClick={() =>
                  file
                    ? toast.success(`File "${file.name}" selected`)
                    : toast.error('No file selected')
                }
              >
                Upload File
              </Button>
            </div>

            {/* Send Button */}
            <div className="flex justify-start">
              <Button variant="default" onClick={handleSave}>
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button onClick={handleSave}>Flag Conversation</Button>
            <Button variant="secondary">Close Conversation</Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
