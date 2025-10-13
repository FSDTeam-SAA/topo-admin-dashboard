'use client'

import { InfoCard } from '@/components/cards/stat-card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export default function HeaderCards() {
  return (
    <div className="space-y-8 ">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-[32px] font-light tracking-[0.2em]">
          Chats
        </h1>
        <Button>
          Download Report <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="mt-[30px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-lg font-sans">
        <InfoCard title="Active Conversations" value="##" />

        <InfoCard title="Flagged Conversations" value="##" />
        <InfoCard title="Top Topics" value="Booking Issues (40%)" />
      </div>

      {/* {isError && (
        <p className="text-red-500 mt-3">Failed to load listings stats</p>
      )} */}
    </div>
  )
}
