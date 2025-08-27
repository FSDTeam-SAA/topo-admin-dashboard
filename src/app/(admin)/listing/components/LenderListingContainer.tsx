import React from 'react'

interface LenderListingContainerProps {
  accessToken: string
}

const LenderListingContainer = ({
  accessToken,
}: LenderListingContainerProps) => {
  console.log('LenderListingContainer accessToken:', accessToken)
  return <div></div>
}

export default LenderListingContainer
