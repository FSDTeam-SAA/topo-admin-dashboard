import { Button } from '@/components/ui/button'
import React from 'react'

export default function ListingBtnSection() {
  return (
    <div className="flex items-center gap-8 bg-white px-6 py-8 shadow-md rounded-lg">
      <Button>Main Site Listings</Button>
      <Button>Lender Listings</Button>
    </div>
  )
}
