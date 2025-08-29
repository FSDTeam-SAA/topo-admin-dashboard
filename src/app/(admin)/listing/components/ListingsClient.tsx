'use client'

import React, { useState } from 'react'
import ListingHeader from './ListingHeader'
import ListingBtnSection from './ListingBtnSection'
import MainListingContainer from './MainLisitngContainer'

import LenderListingContainer from './LenderListingContainer'

interface ListingsClientProps {
  accessToken?: string
}

export default function ListingsClient({ accessToken }: ListingsClientProps) {
  const [isSiteListings, setIsSiteListings] = useState<boolean>(true)

  return (
    <div className="space-y-[30px]">
      <ListingHeader />
      <ListingBtnSection
        isSiteListings={isSiteListings}
        setIsSiteListings={setIsSiteListings}
      />

      {/* Conditional rendering based on state */}
      {isSiteListings ? (
        <MainListingContainer accessToken={accessToken as string} />
      ) : (
        <LenderListingContainer accessToken={accessToken as string} />
      )}
    </div>
  )
}
