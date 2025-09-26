'use client'

import React, { useMemo, useState, useEffect } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PaginationControls } from '@/components/ui/pagination-controls'

import { Skeleton } from '@/components/ui/custom/skeleton'
import { useSession } from 'next-auth/react'
import { SupportDetailsPopup } from './supportDetailsModal'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'

// ---- Types ----
export type Ticket = {
  _id: string
  user?: { _id: string; email: string } | null
  lender?: { _id: string; email: string } | null
  issueType?: string
  createdAt: string
  status: 'pending' | 'resolved' | 'in-progress'
  priority: 'low' | 'medium' | 'high'
  message?: string
}

// ---- Fetcher ----
async function fetchTickets(accessToken: string): Promise<Ticket[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/support/get`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  )
  if (!res.ok) throw new Error('Failed to fetch tickets')
  const json = await res.json()
  return json.data.contacts
}

// ---- Columns ----
const columns: ColumnDef<Ticket>[] = [
  {
    accessorKey: '_id',
    header: 'Ticket ID',
    cell: ({ row }) => row.original._id.slice(0, 8),
  },
  {
    accessorKey: 'user',
    header: 'User ID',
    cell: ({ row }) =>
      row.original.user?._id.slice(0, 8) ||
      row.original.lender?._id.slice(0, 8) || (
        <span className="text-gray-400">Guest</span>
      ),
  },
  {
    accessorKey: 'issueType',
    header: 'Issue Type',
    cell: ({ row }) => row.original.issueType || 'General',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          row.original.status === 'pending'
            ? 'bg-yellow-100 text-yellow-700'
            : row.original.status === 'resolved'
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
          row.original.priority === 'high'
            ? 'bg-red-100 text-red-700'
            : row.original.priority === 'medium'
            ? 'bg-blue-100 text-blue-700'
            : 'bg-green-100 text-green-700'
        }`}
      >
        {row.original.priority}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => {
      const id = row.original?._id
      return (
        <SupportDetailsPopup id={id} data={row.original}>
          <Button
            variant="default"
            className="px-3 py-1 text-[13px] rounded-lg bg-black text-white hover:bg-gray-800 transition-colors"
          >
            View Details
          </Button>
        </SupportDetailsPopup>
      )
    },
  },
]

// ---- Main Component ----
export default function SupportTable() {
  const [search, setSearch] = useState('')
  const [issueFilter, setIssueFilter] = useState<string>('all')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  // Get session for access token
  const session = useSession()
  const accessToken = session.data?.user?.accessToken || ''

  // ---- Fetch Data ----
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tickets', accessToken],
    queryFn: () => fetchTickets(accessToken),
    enabled: !!accessToken,
  })

  // reset to first page when search/filter changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search, issueFilter])

  // ---- Filtering ----
  const filteredData = useMemo(() => {
    if (!data) return []
    return data.filter((item) => {
      const matchesSearch = JSON.stringify(item)
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesIssue =
        issueFilter === 'all' ? true : item.issueType === issueFilter
      return matchesSearch && matchesIssue
    })
  }, [data, search, issueFilter])

  // ---- Table ----
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: Math.max(
      1,
      Math.ceil(filteredData.length / pagination.pageSize)
    ),
  })

  return (
    <div className="bg-white shadow-md rounded-xl p-6 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 py-5 px-2">
        <div className="flex w-full items-center justify-between gap-5">
          {/* Search */}
          <Input
            type="text"
            placeholder="Search via id, type, status or priority..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-[300px]"
          />

          {/* Filter */}
          <Select
            defaultValue="all"
            onValueChange={(val) => setIssueFilter(val)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by issue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="booking">Booking</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="w-full border rounded-2xl overflow-hidden">
          <table className="w-full rounded-xl text-sm">
            <thead>
              <tr>
                <th className="p-2 text-center text-gray-500">Ticket ID</th>
                <th className="p-2 text-center text-gray-500">User ID</th>
                <th className="p-2 text-center text-gray-500">Issue Type</th>
                <th className="p-2 text-center text-gray-500">Date</th>
                <th className="p-2 text-center text-gray-500">Status</th>
                <th className="p-2 text-center text-gray-500">Priority</th>
                <th className="p-2 text-center text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-t">
                  {[...Array(7)].map((_, j) => (
                    <td key={j} className="p-2 text-center">
                      <Skeleton className="h-5 w-24 mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <p className="text-red-500 mt-3 text-center">
          Failed to load support tickets
        </p>
      )}

      {/* Table */}
      {!isLoading && !isError && (
        <>
          <div className="w-full border rounded-2xl overflow-hidden">
            <table className="w-full rounded-xl text-sm">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id}>
                    {hg.headers.map((header) => (
                      <th
                        key={header.id}
                        className="text-center p-2 text-gray-500 font-medium"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 text-gray-900 text-base"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="p-2 text-center">
                          <div className="flex justify-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="p-4 text-center text-gray-500"
                    >
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <PaginationControls
              currentPage={table.getState().pagination.pageIndex + 1}
              totalPages={table.getPageCount()}
              totalItems={filteredData.length}
              itemsPerPage={table.getState().pagination.pageSize}
              onPageChange={(page) => {
                table.setPageIndex(page - 1)
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
