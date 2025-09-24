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
import Image from 'next/image'
import React, { useState } from 'react'

export const AdminTeamSection = () => {
  const [status, setStatus] = useState('active')
  const [role, setRole] = useState('admin')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    formData.set('status', status)
    formData.set('role', role)

    // TODO: Add mutation function here later
    console.log('Admin form submitted:', Object.fromEntries(formData))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">{'Add Admin'}</Button>
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
            Add Admin
          </DialogTitle>
        </DialogHeader>

        {/* FORM START */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Admin ID */}
          <div className="space-y-2">
            <Label htmlFor="adminId" className="tracking-wide font-light">
              Admin ID
            </Label>
            <Input
              id="adminId"
              name="adminId"
              placeholder="Enter admin ID"
              required
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="tracking-wide font-light">
              Name
            </Label>
            <Input id="name" name="name" placeholder="Enter name" required />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="tracking-wide font-light">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Role Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="role" className="tracking-wide font-light">
              Role
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
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
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-start">
            <DialogFooter className="pt-10 ">
              <Button type="submit">Save Admin</Button>
            </DialogFooter>
          </div>
        </form>
        {/* FORM END */}
      </DialogContent>
    </Dialog>
  )
}
