'use client'

import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import BookingsModal from './bookings-modal'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@/components/ui/custom/skeleton'
import { BookingsResponse } from '@/types/bookings/bookingTypes'
import { useFilterBooking } from './states/useFilterBooking'

interface Props {
  token: string
}

const BookingsTable = ({ token }: Props) => {
  const [page, setPage] = React.useState(1)
  const { search, date } = useFilterBooking()

  const { data, isLoading, isFetching } = useQuery<BookingsResponse>({
    queryKey: ['all-bookings', page, search, date],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/all?page=${page}&search=${search}&date=${date}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const json = await res.json()
      return json.data
    },
  })

  const bookings = data?.bookings ?? []
  const paginationInfo = data?.paginationInfo

  return (
    <div className="bg-white p-5 rounded-lg mt-8 shadow-[0px_4px_10px_0px_#0000001A]">
      <div className="overflow-x-auto">
        <Table className="min-w-[1000px]  font-sans text-gray-700 tracking-wider">
          <TableHeader>
            <TableRow className="border-none text-base">
              <TableHead className="text-center">Booking ID</TableHead>
              <TableHead className="text-center">Customer ID</TableHead>
              <TableHead className="text-center">Lender ID</TableHead>
              <TableHead className="text-center">Dress ID</TableHead>
              <TableHead className="text-center">Booking Date</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isFetching ? (
              Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 8 }).map((_, j) => (
                    <TableCell key={j} className="text-center">
                      <Skeleton className="h-5 w-20 mx-auto" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : bookings.length > 0 ? (
              bookings.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{item.id}</TableCell>
                  <TableCell className="text-center">
                    {item.customer._id}
                  </TableCell>
                  <TableCell className="text-center">
                    {item.listing?.lenderId}
                  </TableCell>
                  <TableCell className="text-center">{item.dressId}</TableCell>
                  <TableCell className="text-center">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    {`$ ${item.totalAmount}`}
                  </TableCell>
                  <TableCell className="text-center space-x-1">
                    {item.statusHistory.map((status) => (
                      <span
                        key={status._id}
                        className={`px-2 rounded-3xl font-semibold text-xs py-1 ${
                          status.status === 'Pending' &&
                          'text-orange-600 bg-orange-200'
                        }`}
                      >
                        {status.status}
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="text-center space-x-5">
                    <BookingsModal id={item.id} token={token} />
                    <Button variant="outline">Escalate</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {paginationInfo && (
        <div className="flex justify-between items-center mt-4 text-base font-sans text-slate-600 px-8 ">
          <span>
            Page {paginationInfo.currentPage} of {paginationInfo.totalPages} •{' '}
            {paginationInfo.totalData} records
          </span>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              disabled={!paginationInfo.hasPrevPage}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!paginationInfo.hasNextPage}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingsTable
