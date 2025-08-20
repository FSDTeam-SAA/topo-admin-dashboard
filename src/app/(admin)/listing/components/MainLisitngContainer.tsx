interface ListingContainerProps {
  accessToken: string
  isSiteListings?: boolean
}

export default function MainListingContainer({
  accessToken,
}: ListingContainerProps) {
  console.log(accessToken)
  return (
    <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
      <p className="text-gray-500 text-lg">
        Main Site Listings – Coming Soon 🚧
      </p>
    </div>
  )
}
