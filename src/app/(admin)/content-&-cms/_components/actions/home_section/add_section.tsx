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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

// Types
type HomepageSection = {
  _id: string
  sectionName: string
  content: string
  image: { filename: string; url: string }[]
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// Add Section Hook
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
        throw new Error('Failed to create section')
      }

      return res.json()
    },
  })
}

// Edit Section Hook
function useEditSection(sectionId: string) {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homepageSections/${sectionId}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error('Failed to update section')
      }

      return res.json()
    },
  })
}

// Get Single Section Hook
function useGetSection(sectionId: string, enabled: boolean) {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useQuery({
    queryKey: ['homepageSection', sectionId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/homepageSections/${sectionId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )

      if (!res.ok) {
        throw new Error('Failed to fetch section')
      }

      const json = await res.json()
      return json.data as HomepageSection
    },
    enabled,
  })
}

// Add Section Component
export const HomepageSectionAdd = () => {
  const [status, setStatus] = useState('active')
  const [open, setOpen] = useState(false)
  const addSection = useAddSection()
  const queryClient = useQueryClient()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('status', status)

    addSection.mutate(formData, {
      onSuccess: () => {
        toast.success('Section added successfully')
        queryClient.invalidateQueries({ queryKey: ['homepageSections'] })
        setOpen(false)
        setStatus('active')
        ;(e.target as HTMLFormElement).reset()
      },
      onError: () => {
        toast.error('Failed to add section')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Section</Button>
      </DialogTrigger>

      <DialogContent className="p-8 max-w-2xl font-sans">
        <DialogHeader>
          <div className="flex justify-center my-8">
            <Image
              src="/logo.png"
              alt="modal-Alert"
              width={70}
              height={60}
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-3xl tracking-wide font-light py-6">
            Add Section
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section Name */}
          <div className="space-y-2">
            <Label htmlFor="sectionName" className="tracking-wide font-light">
              Section Name
            </Label>
            <Input
              id="sectionName"
              name="sectionName"
              placeholder="Enter section name"
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
              placeholder="Enter section content"
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image" className="tracking-wide font-light">
              Section Image (JPEG/PNG, Max 20MB)
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
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-start">
            <DialogFooter className="pt-10">
              <Button type="submit" disabled={addSection.isPending}>
                {addSection.isPending ? 'Saving...' : 'Save Section'}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Edit Section Component
export const HomepageSectionEdit = ({
  sectionId,
  children,
}: {
  sectionId: string
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('active')
  const [isInitialized, setIsInitialized] = useState(false)

  const editSection = useEditSection(sectionId)
  const queryClient = useQueryClient()

  const { data: sectionData, isLoading } = useGetSection(sectionId, open)

  // Initialize form data when section data is loaded
  useEffect(() => {
    if (sectionData && !isInitialized) {
      setStatus(sectionData.status)
      setIsInitialized(true)
    }
  }, [sectionData, isInitialized])

  // Reset initialization when modal closes
  useEffect(() => {
    if (!open) {
      setIsInitialized(false)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('status', status)

    editSection.mutate(formData, {
      onSuccess: () => {
        toast.success('Section updated successfully')
        queryClient.invalidateQueries({ queryKey: ['homepageSections'] })
        setOpen(false)
      },
      onError: () => {
        toast.error('Failed to update section')
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="p-8 max-w-2xl font-sans overflow-y-auto max-h-[90vh] scroll-smooth">
        <DialogHeader>
          <div className="flex justify-center my-8">
            <Image
              src="/logo.png"
              alt="modal-Alert"
              width={70}
              height={60}
              className="object-cover"
            />
          </div>
          <DialogTitle className="text-3xl tracking-wide font-light py-6">
            Edit Section
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : sectionData ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section Name */}
            <div className="space-y-2">
              <Label htmlFor="sectionName" className="tracking-wide font-light">
                Section Name
              </Label>
              <Input
                id="sectionName"
                name="sectionName"
                defaultValue={sectionData.sectionName}
                placeholder="Enter section name"
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
                defaultValue={sectionData.content}
                placeholder="Enter section content"
                rows={4}
                required
              />
            </div>

            {/* Current Image Preview */}
            {sectionData.image && sectionData.image.length > 0 && (
              <div className="space-y-2">
                <Label className="tracking-wide font-light">
                  Current Image
                </Label>
                <div className="flex justify-start">
                  <Image
                    src={sectionData.image[0].url}
                    alt={sectionData.sectionName}
                    width={600}
                    height={460}
                    className="rounded-md object-cover border"
                  />
                </div>
              </div>
            )}

            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image" className="tracking-wide font-light">
                Replace Image (JPEG/PNG, Max 20MB) - Optional
              </Label>
              <Input id="image" name="filename" type="file" accept="image/*" />
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
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-start">
              <DialogFooter className="pt-5">
                <Button type="submit" disabled={editSection.isPending}>
                  {editSection.isPending ? 'Updating...' : 'Update Section'}
                </Button>
              </DialogFooter>
            </div>
          </form>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
