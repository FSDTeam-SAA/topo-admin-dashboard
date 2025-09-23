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
import { HomepageSection } from './add_section'
import { PaginationControls } from '@/components/ui/pagination-controls'

// Type
type Section = {
  id: string
  name: string
  summary: string
  updatedAt: string
  status: 'Active' | 'Draft'
}

// Dummy Data
const dummySections: Section[] = [
  {
    id: 'sec-101',
    name: 'Hero Section',
    summary: 'Main banner with CTA and background image',
    updatedAt: '2025-09-15',
    status: 'Active',
  },
  {
    id: 'sec-102',
    name: 'About Us',
    summary: 'Company introduction and mission',
    updatedAt: '2025-09-10',
    status: 'Draft',
  },
  {
    id: 'sec-103',
    name: 'Services',
    summary: 'List of provided services',
    updatedAt: '2025-09-08',
    status: 'Active',
  },
]

// Columns
const columns: ColumnDef<Section>[] = [
  { accessorKey: 'id', header: 'Section ID' },
  { accessorKey: 'name', header: 'Section Name' },
  { accessorKey: 'summary', header: 'Content Summary' },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) =>
      new Date(row.original.updatedAt).toLocaleDateString('en-US', {
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
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.status === 'Active'
            ? 'bg-green-100 text-green-700'
            : 'bg-blue-100 text-blue-700'
        }`}
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <button className="px-3 py-1 text-[13px] rounded-lg bg-black text-white">
        View Details
      </button>
    ),
  },
]

// Main Component
export default function HomePageSectionTable() {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  // reset to first page when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search])

  // filter locally
  const filteredData = useMemo(() => {
    return dummySections.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 py-5">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold">Home Page Sections</h2>
          <div className="flex items-center gap-8">
            <Input
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px]"
            />
            <div>
              {/* Status Dropdown */}
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Add Section Button */}
        <HomepageSection />
      </div>

      {/* Table */}
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
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <PaginationControls
          currentPage={table.getState().pagination.pageIndex + 1} // 1-based
          totalPages={table.getPageCount()}
          totalItems={filteredData.length}
          itemsPerPage={table.getState().pagination.pageSize}
          onPageChange={(page) => {
            table.setPageIndex(page - 1) // react-table is 0-based
          }}
        />
      </div>
    </div>
  )
}
