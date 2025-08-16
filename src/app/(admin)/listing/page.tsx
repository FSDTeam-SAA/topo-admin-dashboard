'use client'

import React, { useState } from 'react'
import ListingHeader from './components/listingHeader/ListingHeader'
import ListingBtnSection from './components/ButtonsSection/ListingBtnSection'
import MainListingContainer from './components/mainListingContainer/MainListingContainer'

export default function Page() {
  const [isSiteListings, setIsSiteListings] = useState<boolean>(true)
  return (
    <div className="space-y-[30px]">
      <ListingHeader />
      <ListingBtnSection
        isSiteListings={isSiteListings}
        setIsSiteListings={setIsSiteListings}
      />
      {/* Main Site Listings */}
      <MainListingContainer isSiteListings={isSiteListings} />
    </div>
  )
}
