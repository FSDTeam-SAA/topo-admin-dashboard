'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface ListingHeaderProps {
  isSiteListings: boolean
}

export default function MainListingHeader({
  isSiteListings,
}: ListingHeaderProps) {
  return (
    <div>
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-[24px] font-medium leading-[120%]">
          {isSiteListings ? 'Main Site Listings' : 'Lender Listings'}
        </h2>
        <div className="flex items-center gap-7">
          <Select>
            <SelectTrigger className="w-[180px] py-4.5">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>

          <Input placeholder={`Search.....`} />
        </div>
      </div>
    </div>
  )
}
