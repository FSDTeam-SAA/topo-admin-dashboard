// ================================================================
// bookings-tab.tsx
// ================================================================
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { TableContainer } from '../table-container'
import { BookingData, bookingTableColumns } from './bookings-column'
import { PaginationControls } from '@/components/ui/pagination-controls'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'

interface Props {
  data: {
    data: any[]
    paginationInfo: {
      currentPage: number
      totalPages: number
      totalData: number
      hasNextPage: boolean
      hasPrevPage: boolean
    }
  }
}

interface BookingTableProps {
  data: BookingData[]
  columns: ColumnDef<BookingData>[]
}

const BookingsTab = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(
    data?.paginationInfo?.currentPage || 1
  )

  console.log('current page', currentPage)

  console.log('bookings data', data)

  return (
    <div className="space-y-6 w-full">
      <Card className="shadow-none rounded-[6px] w-full ">
        <CardHeader>
          <CardTitle className="font-light font-sans">
            Bookings History
          </CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[14px] font-sans">
          {/* Table */}
          <BookingsTable
            data={data?.data ?? []}
            columns={bookingTableColumns}
          />

          {/* Pagination */}
          {data?.paginationInfo && data.paginationInfo.totalPages > 1 && (
            <div className="mt-4 w-full flex justify-end">
              <PaginationControls
                currentPage={data.paginationInfo.currentPage}
                totalPages={data.paginationInfo.totalPages}
                totalItems={data.paginationInfo.totalData}
                itemsPerPage={10} // You can adjust this or get from API
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default BookingsTab

export const BookingsTable = ({ data, columns }: BookingTableProps) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="bg-white">
        {/*  Scrollable Wrapper */}
        <div className="max-h-[500px] overflow-auto border rounded-md">
          <DataTable table={table} columns={columns} />
        </div>
      </div>
    </>
  )
}
