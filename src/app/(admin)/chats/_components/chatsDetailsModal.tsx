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

export function ChatsDetailsPopup({ children }: { children: React.ReactNode }) {
  // ---- Demo Data ----
  const id = 'CHAT-12345'
  const data = {
    user: { _id: 'USR-98765' },
    issueType: 'Message Support',
    createdAt: new Date(),
    message:
      'Customer reported a delay in receiving chat responses. Please review conversation logs.',
  }

  const [response, setResponse] = useState('')

  // --- DEMO Save Function ---
  const handleSave = () => {
    const payload = { response, status }
    console.log('💬 Demo Save Payload:', payload)
    toast.success('Chat details updated (demo only)')
  }

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
              <strong className="font-medium">Conversation ID:</strong> {id}
            </span>
          </div>
        </DialogHeader>

        {/* Chat Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light tracking-wider">
              Chat Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2 font-light tracking-wider">
            <p>
              <strong className="font-medium">Chat ID:</strong> {id}
            </p>
            <p>
              <strong className="font-medium">User ID:</strong>{' '}
              {data?.user?._id || 'Guest'}
            </p>
            <p>
              <strong className="font-medium">Topic:</strong>{' '}
              {data?.issueType || 'N/A'}
            </p>
            <p>
              <strong className="font-medium">Status:</strong> {status}
            </p>
            <p>
              <strong className="font-medium">Created Date:</strong>{' '}
              {new Date(data?.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
              })}
            </p>
            <p>
              <strong className="font-medium">Message:</strong>{' '}
              {data?.message || 'N/A'}
            </p>
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
                className="border border-gray-300 rounded-md p-2 w-full "
              />
              <Button className="whitespace-nowrap">Upload File</Button>
            </div>

            {/* Send Button */}
            <div className="flex justify-start">
              <Button variant="default">Send</Button>
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
