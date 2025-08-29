import React from 'react'

const DressDetailSkeleton = () => {
  return (
    <div className="bg-white shadow rounded-lg max-w-full mx-auto overflow-hidden">
      {/* Top banner skeleton */}
      <div className="bg-[#1e1e1e] text-white px-6 py-3 text-sm font-medium flex justify-between items-center">
        <div className="w-64 h-4 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="flex gap-2">
          <div className="w-20 h-6 bg-gray-300 rounded-md animate-pulse"></div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start relative">
          <div className="space-y-2">
            <div className="w-64 h-6 bg-gray-300 rounded-md animate-pulse"></div>
            <div className="w-48 h-4 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
          <div className="w-24 h-8 bg-gray-300 rounded-md animate-pulse"></div>
        </div>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Images + specs skeleton */}
          <div className="space-y-4">
            <div className="w-full h-64 bg-gray-300 rounded-md animate-pulse"></div>

            <div className="bg-gray-50 p-4 rounded-lg shadow-sm space-y-2 text-sm">
              {[
                'Category',
                'Material',
                'Colour',
                'Condition',
                'Size',
                'Care',
                'Insurance',
                'Pickup',
                'Status',
              ].map((text, index) => (
                <p
                  key={index}
                  className="w-32 h-4 bg-gray-300 rounded-md animate-pulse"
                ></p>
              ))}
            </div>
          </div>

          {/* Right: Description + Pricing + Actions skeleton */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse mb-2"></div>
              <div className="w-full h-4 bg-gray-300 rounded-md animate-pulse mb-2"></div>

              <div className="w-48 h-4 bg-gray-300 rounded-md animate-pulse mb-2"></div>
              <div className="w-24 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            <div className="flex justify-end gap-2 lg:gap-6 mt-6">
              <div className="w-28 h-10 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="w-28 h-10 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DressDetailSkeleton
