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
import { PaginationControls } from '@/components/ui/pagination-controls'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// ✅ Type Definition
type Conversation = {
  customerId: string
  lenderId: string
  lastMessage: string
  date: string
  status: 'Active' | 'Pending' | 'Closed'
}

// ✅ Demo Data
const dummyConversations: Conversation[] = [
  {
    customerId: 'CUS-101',
    lenderId: 'LEN-501',
    lastMessage: 'Thank you, I’ll review and confirm soon.',
    date: '2025-10-05',
    status: 'Active',
  },
  {
    customerId: 'CUS-102',
    lenderId: 'LEN-502',
    lastMessage: 'Can you extend the repayment date?',
    date: '2025-09-29',
    status: 'Pending',
  },
  {
    customerId: 'CUS-103',
    lenderId: 'LEN-503',
    lastMessage: 'This case has been resolved successfully.',
    date: '2025-09-20',
    status: 'Closed',
  },
  {
    customerId: 'CUS-104',
    lenderId: 'LEN-504',
    lastMessage: 'Need help updating my contact details.',
    date: '2025-09-15',
    status: 'Active',
  },
]

// ✅ Table Columns
const columns: ColumnDef<Conversation>[] = [
  { accessorKey: 'customerId', header: 'Customer ID' },
  { accessorKey: 'lenderId', header: 'Lender ID' },
  {
    accessorKey: 'lastMessage',
    header: 'Last Message',
    cell: ({ row }) => (
      <span className="line-clamp-1 text-gray-800">
        {row.original.lastMessage}
      </span>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) =>
      new Date(row.original.date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      const color =
        status === 'Active'
          ? 'bg-green-100 text-green-700'
          : status === 'Pending'
          ? 'bg-yellow-100 text-yellow-700'
          : 'bg-gray-100 text-gray-700'

      return (
        <Badge
          className={`${color} font-medium text-xs px-3 py-1 rounded-full`}
        >
          {status}
        </Badge>
      )
    },
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <button className="px-3 py-1 text-sm rounded-lg bg-black text-white hover:bg-gray-800 transition">
        View Chat
      </button>
    ),
  },
]

// ✅ Main Component
export default function MessageTable() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'Active' | 'Pending' | 'Closed'
  >('all')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  // reset to first page when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search, statusFilter])

  // filtered data
  const filteredData = useMemo(() => {
    return dummyConversations.filter((item) => {
      const matchesSearch = JSON.stringify(item)
        .toLowerCase()
        .includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

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
    <div className="bg-white shadow-md rounded-xl p-6">
      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        {/* Left: Search */}
        <Input
          type="text"
          placeholder="Search by name, ID, or message..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[250px]"
        />

        {/* Right: Status Filter */}
        <Select
          value={statusFilter}
          onValueChange={(value) =>
            setStatusFilter(value as 'all' | 'Active' | 'Pending' | 'Closed')
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="w-full border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} className="bg-gray-50">
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-center p-3 text-gray-600 font-medium"
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
                  className="hover:bg-gray-50 text-gray-900 text-[15px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-3 text-center">
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
                  className="p-6 text-center text-gray-500"
                >
                  No conversations found
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
    </div>
  )
}
