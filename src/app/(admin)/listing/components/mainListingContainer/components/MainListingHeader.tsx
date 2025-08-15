'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function MainListingHeader() {
  return (
    <div>
      <div className="p-5 flex flex-col md:flex-row md:items-center justify-between">
        <h2 className="text-[24px] font-medium leading-[120%]">
          Main Site Listings
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
