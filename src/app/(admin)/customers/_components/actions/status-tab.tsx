import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'
import { DemoCustomerProfile } from '../customer-table-column'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  data: DemoCustomerProfile
}

const StatusTab = ({ data }: Props) => {
  return (
    <div className="mt-5 font-sans">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Account Status</h1>

        <div className="text-sm space-y-2">
          <h3 className="flex items-center gap-1">
            <span>Current Status: </span>
            <span>
              {data.statusHistory?.length ? (
                data.statusHistory.map((status, idx) => (
                  <span
                    key={idx}
                    className={`${
                      status.current === 'pending'
                        ? 'text-orange-600'
                        : status.current === 'inactive'
                        ? 'text-red-600'
                        : 'text-green-600'
                    }`}
                  >
                    {status.current}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No history available</span>
              )}
            </span>
          </h3>
          <h3>
            Last Updated: {new Date(data?.joinedAt ?? '').toLocaleDateString()}
          </h3>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="mb-2">Update Status</h1>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="update status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="disputed">Disputed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h1 className="mb-2">Reason for Change</h1>
        <Textarea className="h-[150px]" />
      </div>

      <Card className="shadow-none rounded-[6px] w-full">
        <CardHeader>
          <CardTitle className="font-light font-sans">Actions</CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[12px]">
          <div className="space-y-6">
            <div className=" border-b-2 pb-4 flex items-center gap-4">
              <Button variant="outline">Approve</Button>
              <Button variant="outline">Suspend</Button>
            </div>
            <div className="flex items-center gap-4">
              <Button variant={'default'}>Save Changes</Button>
              <Button variant={'outline'}>Download Report</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatusTab
