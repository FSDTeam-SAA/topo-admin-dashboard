import React from 'react'
import ListingHeader from './components/listingHeader/ListingHeader'
import ListingBtnSection from './components/ButtonsSection/ListingBtnSection'
import MainListingContainer from './components/mainListingContainer/MainListingContainer'

export default function page() {
  return (
    <div className="space-y-[30px]">
      <ListingHeader />
      <ListingBtnSection />
      {/* Main Site Listings */}
      <MainListingContainer />
    </div>
  )
}
