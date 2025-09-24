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
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

function useAddSection() {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homepageSections`,
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

export const HomepageSection = () => {
  const [status, setStatus] = useState('active')
  const addBanner = useAddSection()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set('status', status)

    addBanner.mutate(formData, {
      onSuccess: (data) => {
        console.log('Homepage section added:', data)
        toast.success('Homepage section created successfully!')
      },
      onError: (error) => {
        console.error('Error adding homepage section:', error)
        toast.error('Failed to create homepage section!')
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'}>{'Add Section'}</Button>
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
            Add Homepage Section
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
              name="sectionName"
              placeholder="Enter title"
              required
            />
          </div>

          {/* content description */}
          <div className="space-y-2">
            <Label htmlFor="content" className="tracking-wide font-light">
              Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Enter content"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="tracking-wide font-light">
              Image (JPEG/PNG, Max 5MB)
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
              <Button disabled={addBanner.isPending} type="submit">
                {addBanner.isPending ? 'saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </div>
        </form>
        {/* FORM END */}
      </DialogContent>
    </Dialog>
  )
}
