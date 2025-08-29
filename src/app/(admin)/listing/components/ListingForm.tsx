'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Image from 'next/image'
<<<<<<< HEAD
// import { Dress } from '../types/listtingsResponseTypes'

interface ListingFormProps {
  listing: ListingFormData
  open: boolean
  onOpenChange: (open: boolean) => void
}
=======
>>>>>>> mamun

export interface Location {
  _id: string
  addressLine: string
  postalCode: string
}

export interface RentalPrice {
  fourDays: number
  eightDays: number
  _id: string
}

export interface ListingFormData {
  lenderId: string
  dressId: string
  dressName: string
  brand: string
  size: string
  colour: string
  condition: string
  category: string
  locations: Location[]
  media: string[]
  description: string
  rentalPrice: RentalPrice
  material: string
  careInstructions: string
  occasion: string[]
<<<<<<< HEAD
  status: 'pending' | 'active' | 'paused'
=======
  status?: 'pending' | 'active' | 'paused' | 'booked'
>>>>>>> mamun
  insurance: boolean
  pickupOption: 'Pickup' | 'Local' | 'Delivery'
  approvalStatus: 'pending' | 'approved' | 'rejected'
  reasonsForRejection: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  id: string
}

<<<<<<< HEAD
=======
interface ListingFormProps {
  listing: ListingFormData
  open: boolean
  onOpenChange: (open: boolean) => void
}

>>>>>>> mamun
export default function ListingForm({
  listing,
  open,
  onOpenChange,
}: ListingFormProps) {
  const { register, handleSubmit } = useForm<ListingFormData>({
    defaultValues: listing,
  })

  const onSubmit = (data: ListingFormData) => {
    console.log('Updated listing:', data)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-screen overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-center items-center">
            <div className="relative h-[80px] w-[80px] bg-black p-12 mb-3 rounded">
              <Image
                src="https://files.edgestore.dev/2pgl62wxp0dbg019/Dev/_public/276405a7-8be0-4e32-b05c-4d6dfb02d288.svg"
                alt="logo"
                fill
              />
            </div>
          </div>
          <DialogTitle>Listing: {listing.id}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
<<<<<<< HEAD
          {/* Status Toggle */}
=======
>>>>>>> mamun
          <div className="flex items-center justify-between">
            <Label>Status</Label>
            <Switch defaultChecked={listing.status === 'active'} />
          </div>

<<<<<<< HEAD
          {/* Listing ID */}
=======
>>>>>>> mamun
          <div>
            <Label>Listing ID</Label>
            <Input {...register('id')} readOnly />
          </div>

<<<<<<< HEAD
          {/* Dress ID */}
=======
>>>>>>> mamun
          <div>
            <Label>Dress ID</Label>
            <Input {...register('dressId')} readOnly />
          </div>

<<<<<<< HEAD
          {/* Lender */}
=======
>>>>>>> mamun
          <div>
            <Label>Lenders ID</Label>
            <Input value={listing.lenderId || 'N/A'} readOnly />
          </div>

<<<<<<< HEAD
          {/* Dress Name */}
=======
>>>>>>> mamun
          <div>
            <Label>Dress Name</Label>
            <Input {...register('dressName')} />
          </div>

<<<<<<< HEAD
          {/* Brand */}
=======
>>>>>>> mamun
          <div>
            <Label>Brand</Label>
            <Input {...register('brand')} />
          </div>

<<<<<<< HEAD
          {/* Size */}
=======
>>>>>>> mamun
          <div>
            <Label>Size Available</Label>
            <Input {...register('size')} />
          </div>

<<<<<<< HEAD
          {/* Colour */}
=======
>>>>>>> mamun
          <div>
            <Label>Colour</Label>
            <Input {...register('colour')} />
          </div>

<<<<<<< HEAD
          {/* Occation */}
=======
>>>>>>> mamun
          <div>
            <Label>Occasion</Label>
            <Input {...register('occasion')} />
          </div>

<<<<<<< HEAD
          {/* Best Price */}
=======
>>>>>>> mamun
          <div>
            <Label>Best Price</Label>
            <Input value={listing?.rentalPrice.eightDays} readOnly />
          </div>

<<<<<<< HEAD
          {/* Description */}
=======
>>>>>>> mamun
          <div>
            <Label>Description</Label>
            <Textarea {...register('description')} />
          </div>

<<<<<<< HEAD
          {/* Thumbnail (first image) */}
=======
>>>>>>> mamun
          <div>
            <Label>Thumbnail</Label>
            <Image
              src={listing.media[0]}
              alt={listing.dressName}
              width={80}
              height={80}
              className="w-20 h-20 object-cover rounded"
            />
          </div>

<<<<<<< HEAD
          {/* Last Updated */}
=======
>>>>>>> mamun
          <div>
            <Label>Last Updated</Label>
            <Input
              value={new Date(listing.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
              readOnly
            />
          </div>

<<<<<<< HEAD
          {/* Pickup/Shipping Options */}
=======
>>>>>>> mamun
          <div>
            <Label>Pickup/Shipping Options</Label>
            <div className="flex flex-col space-y-1 mt-1">
              {['Pickup', 'Local', 'Delivery'].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option}
                    {...register('pickupOption')}
                    className="accent-black"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

<<<<<<< HEAD
          {/* Buttons */}
=======
>>>>>>> mamun
          <div className="flex gap-2 justify-start">
            <Button type="submit">Save Changes</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
