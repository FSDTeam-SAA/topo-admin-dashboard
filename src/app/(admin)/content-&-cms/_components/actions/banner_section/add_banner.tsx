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
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

function useAddBanner() {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/banner`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error('Failed to create banner')
      }

      return res.json()
    },
  })
}

export const BannerSection = () => {
  const [status, setStatus] = useState('active')
  const addBanner = useAddBanner()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set('status', status)

    addBanner.mutate(formData, {
      onSuccess: (data) => {
        console.log('Banner added successfully', data)
        toast.success('Banner added successfully')
      },
      onError: (error) => {
        console.error('Error adding banner:', error)
        toast.error('Failed to add banner')
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{'Add Banner'}</Button>
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
            Add Banner
          </DialogTitle>
        </DialogHeader>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="tracking-wide font-light">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter banner title"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="tracking-wide font-light">
              Banner Image (JPEG/PNG, Max 5MB)
            </Label>
            <Input
              id="image"
              name="filename"
              type="file"
              accept="image/*"
              required
            />
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
            <DialogFooter className="pt-10 ">
              <Button type="submit">Save Banner</Button>
            </DialogFooter>
          </div>
        </form>
        {/* FORM END */}
      </DialogContent>
    </Dialog>
  )
}
