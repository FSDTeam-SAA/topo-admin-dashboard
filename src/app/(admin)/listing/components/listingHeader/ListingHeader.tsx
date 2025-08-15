import { InfoCard } from '@/components/cards/stat-card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import React from 'react'

export default function ListingHeader() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-light tracking-[20%]">Manage Listings </h1>
        <Button>
          Download Report <Download />
        </Button>
      </div>

      <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <InfoCard title="Total Listings" value="##" />
        <InfoCard title="Pending Submissions" value="##" />
        <InfoCard title="Approved Listings" value="##" />
        <InfoCard title="Needs Review" value="##" />
      </div>
    </div>
  )
}
