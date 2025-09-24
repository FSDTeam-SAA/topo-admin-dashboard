'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React, { useState } from 'react'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

function useAddTestimonial() {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useMutation({
    mutationFn: async (payload: {
      customerName: string
      content: string
      rating: string
      status: string
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/testimonoal`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      )

      console.log('payload', payload)

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData?.message || 'Failed to create policy')
      }

      return res.json()
    },
  })
}

export const TestimonialSection = () => {
  const [status, setStatus] = useState('active')
  const [rating, setRating] = useState('5')
  const add = useAddTestimonial()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const payload = {
      customerName: formData.get('customerName') as string,
      content: formData.get('content') as string,
      rating,
      status,
    }

    add.mutate(payload, {
      onSuccess: (data) => {
        console.log('Testimonial added:', data)
        toast.success('Testimonial created successfully!')
      },
      onError: (error) => {
        console.error('Error adding testimonial:', error)
        toast.error(error.message || 'Failed to create testimonial!')
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{'Add Testimonial'}</Button>
      </DialogTrigger>

      <DialogContent className="p-8">
        <DialogHeader>
          <div className="flex justify-center my-8">
            <Image
              src={'/logo.png'}
              alt="modal-Alert"
              width={70}
              height={60}
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-3xl tracking-wide font-light py-6">
            Add Testimonial
          </DialogTitle>
        </DialogHeader>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Customer Name */}
          <div className="space-y-2">
            <Label htmlFor="customerName" className="tracking-wide font-light">
              Customer Name
            </Label>
            <Input
              id="customerName"
              name="customerName"
              placeholder="Enter customer name"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="tracking-wide font-light">
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter testimonial content"
              required
            />
          </div>

          {/* Rating Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="rating" className="tracking-wide font-light">
              Rating
            </Label>
            <Select value={rating} onValueChange={setRating}>
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="status" className="tracking-wide font-light">
              Status
            </Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-start">
            <DialogFooter className="pt-10">
              <Button type="submit">Save Testimonial</Button>
            </DialogFooter>
          </div>
        </form>
        {/* FORM END */}
      </DialogContent>
    </Dialog>
  )
}
