'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import Image from 'next/image'

export function SupportDetailsPopup({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const [status, setStatus] = useState('open')
  const [priority, setPriority] = useState('high')

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[1000px] max-h-[90vh] overflow-y-auto p-3 py-8 space-y-4 font-sans">
        {/* Header */}
        <DialogHeader>
          <div className="flex justify-center mb-7 mt-6">
            <Image
              src="/logo.png"
              alt="Support Ticket"
              width={100}
              height={100}
              priority
              className="object-contain"
              quality={100}
            />
          </div>
          <div className="flex justify-start">
            <span className="text-lg font-light tracking-wider">
              <strong className="font-medium">Transaction Details:</strong> {id}
            </span>
          </div>
        </DialogHeader>

        {/* Ticket Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-light tracking-wider">
              Ticket Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1 font-light tracking-wider">
            <p>
              <strong className="font-medium">Ticket ID:</strong> {id}
            </p>
            <p>
              <strong className="font-medium">User ID:</strong> U98765
            </p>
            <p>
              <strong className="font-medium">Issue Type:</strong> Payment Issue
            </p>
            <p>
              <strong className="font-medium">Status:</strong> {status}
            </p>
            <p>
              <strong className="font-medium">Priority:</strong> {priority}
            </p>
            <p>
              <strong className="font-medium">Created Date:</strong> Apr 15,
              2025
            </p>
            <p>
              <strong className="font-medium">Description:</strong> Payment
              failed due to invalid card.
            </p>
            <p>
              <strong className="font-medium">Related Entities:</strong> Booking
              ID #99999, Customer ID #88888
            </p>
          </CardContent>
        </Card>

        {/* Communication */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Communication</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Response Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Note Template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="template1">Template 1</SelectItem>
                  <SelectItem value="template2">Template 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Admin Note</Label>
              <Textarea placeholder="Write note..." rows={10} />
            </div>

            <div className="flex items-center gap-2">
              <Input type="file" className="flex-1" />
              <Button variant="secondary">Upload File</Button>
            </div>

            <Button>Send</Button>
          </CardContent>
        </Card>

        {/* Update Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Update Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Update Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Update Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Save Changes</Button>
            <Button variant="secondary">Download Report</Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
