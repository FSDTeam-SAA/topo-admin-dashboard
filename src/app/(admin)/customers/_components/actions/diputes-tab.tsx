// ================================================================
// disputes-tab.tsx
// ================================================================
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { DisputeData, disputeTableColumns } from './dispute-table-columns'
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

interface DisputesTableProps {
  data: DisputeData[]
  columns: ColumnDef<DisputeData>[]
}

const DisputesTab = ({ data }: Props) => {
  const [currentPage, setCurrentPage] = useState(
    data?.paginationInfo?.currentPage || 1
  )

  console.log('disputes data', data)
  console.log('current page ', currentPage)

  return (
    <div className="space-y-6 w-full">
      <Card className="shadow-none rounded-[6px] w-full">
        <CardHeader>
          <CardTitle className="font-light font-sans">
            Customer Disputes
          </CardTitle>
        </CardHeader>

        <CardContent className="font-light text-[14px] font-sans">
          {data?.data && data.data.length > 0 ? (
            <>
              {/* Table */}
              <DisputesTable
                data={data?.data ?? []}
                columns={disputeTableColumns}
              />

              {/* Pagination */}
              {data?.paginationInfo && data.paginationInfo.totalPages > 1 && (
                <div className="mt-4 w-full flex justify-end">
                  <PaginationControls
                    currentPage={data.paginationInfo.currentPage}
                    totalPages={data.paginationInfo.totalPages}
                    totalItems={data.paginationInfo.totalData}
                    itemsPerPage={10}
                    onPageChange={(page) => setCurrentPage(page)}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No disputes found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DisputesTab

export const DisputesTable = ({ data, columns }: DisputesTableProps) => {
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
