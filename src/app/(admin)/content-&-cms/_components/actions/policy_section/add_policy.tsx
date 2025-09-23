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
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'sonner'

function useAddPolicy() {
  const session = useSession()
  const accessToken = session?.data?.user.accessToken

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/policies`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      )

      if (!res.ok) {
        throw new Error('Failed to create policy')
      }

      return res.json()
    },
  })
}

export const PolicySection = () => {
  const [status, setStatus] = useState('active')
  const addPolicy = useAddPolicy()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set('status', status)

    addPolicy.mutate(formData, {
      onSuccess: (data) => {
        console.log('Policy added:', data)
        toast.success('Policy created successfully!')
      },
      onError: (error) => {
        console.error('Error adding policy:', error)
        toast.error('Failed to create policy!')
      },
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'default'}>{'Add Policy'}</Button>
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
            Add Policy
          </DialogTitle>
        </DialogHeader>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Policy Name */}
          <div className="space-y-2">
            <Label htmlFor="policyName" className="tracking-wide font-light">
              Policy Name
            </Label>
            <Input
              id="policyName"
              name="policyName"
              placeholder="Enter policy name"
              required
            />
          </div>

          {/* Details */}
          <div className="space-y-2">
            <Label htmlFor="details" className="tracking-wide font-light">
              Details
            </Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Enter policy details"
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
              <Button disabled={addPolicy.isPending} type="submit">
                {addPolicy.isPending ? 'Saving...' : 'Save Policy'}
              </Button>
            </DialogFooter>
          </div>
        </form>
        {/* FORM END */}
      </DialogContent>
    </Dialog>
  )
}
