'use client'

import React, { useState } from 'react'
import ListingHeader from '../listingHeader/ListingHeader'
import ListingBtnSection from '../ButtonsSection/ListingBtnSection'
import MainListingContainer from '../mainListingContainer/MainListingContainer'
import LenderTableContainer from '@/app/(admin)/lenders/_components/lender-table-container'
// import LenderListingContainer from './components/lenderListingContainer/LenderListingContainer'

interface ListingsClientProps {
  accessToken: string
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
        <MainListingContainer
          accessToken={accessToken}
          isSiteListings={isSiteListings}
        />
      ) : (
        // <LenderListingContainer />
        <LenderTableContainer accessToken={accessToken} />
      )}
    </div>
  )
}
