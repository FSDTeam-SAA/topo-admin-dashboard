'use client'

import { Button } from '@/components/ui/button'
import React from 'react'

interface ListingBtnSectionProps {
  isSiteListings: boolean
  setIsSiteListings: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ListingBtnSection({
  isSiteListings,
  setIsSiteListings,
}: ListingBtnSectionProps) {
  return (
    <div className="flex items-center gap-8 bg-white px-6 py-8 shadow-md rounded-lg">
      {/* Main Site Listings Button */}
      <Button
        onClick={() => setIsSiteListings(true)}
        className={`border hover:text-white ${
          isSiteListings
            ? 'bg-black text-white border-black'
            : 'bg-white text-black border-black'
        }`}
      >
        Main Site Listings
      </Button>

      {/* Lender Listings Button */}
      <Button
        onClick={() => setIsSiteListings(false)}
        className={`border hover:text-white ${
          !isSiteListings
            ? 'bg-black text-white border-black'
            : 'bg-white text-black border-black'
        }`}
      >
        Lender Listings
      </Button>
    </div>
  )
}
