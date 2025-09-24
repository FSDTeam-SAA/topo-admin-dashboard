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
    mutationFn: async (payload: {
      name: string
      details: string
      status: string
    }) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/termsAndConditions`,
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

export const PolicySection = () => {
  const [status, setStatus] = useState('active')
  const addPolicy = useAddPolicy()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const payload = {
      name: formData.get('name') as string,
      details: formData.get('details') as string,
      status,
    }

    addPolicy.mutate(payload, {
      onSuccess: (data) => {
        console.log('Policy added:', data)
        toast.success('Policy created successfully!')
      },
      onError: (error) => {
        console.error('Error adding policy:', error)
        toast.error(error.message || 'Failed to create policy!')
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

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="policyName">Policy Name</Label>
            <Input
              id="policyName"
              name="name"
              placeholder="Enter policy name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Details</Label>
            <Textarea
              id="details"
              name="details"
              placeholder="Enter policy details"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
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

          <DialogFooter className="pt-10">
            <Button disabled={addPolicy.isPending} type="submit">
              {addPolicy.isPending ? 'Saving...' : 'Save Policy'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
