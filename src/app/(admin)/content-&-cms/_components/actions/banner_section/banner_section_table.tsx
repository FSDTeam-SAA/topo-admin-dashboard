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
import Image from 'next/image'
import { PaginationControls } from '@/components/ui/pagination-controls'

// Type
type Banner = {
  bannerId: string
  title: string
  image: string
  updatedAt: string
  status: 'Active' | 'Draft'
}

// Dummy Data
const dummyBanners: Banner[] = [
  {
    bannerId: 'ban-201',
    title: 'Summer Sale',
    image: '/default_image.jpg',
    updatedAt: '2025-09-18',
    status: 'Active',
  },
  {
    bannerId: 'ban-202',
    title: 'New Arrivals',
    image: '/default_image.jpg',
    updatedAt: '2025-09-12',
    status: 'Draft',
  },
  {
    bannerId: 'ban-203',
    title: 'Holiday Discount',
    image: '/default_image.jpg',
    updatedAt: '2025-09-05',
    status: 'Active',
  },
]

// Columns
const columns: ColumnDef<Banner>[] = [
  { accessorKey: 'bannerId', header: 'Banner ID' },
  { accessorKey: 'title', header: 'Title' },
  {
    accessorKey: 'image',
    header: 'Image Preview',
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Image
          src={row.original.image}
          alt={row.original.title}
          width={80}
          height={40}
          className="rounded-md object-cover border"
        />
      </div>
    ),
  },
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
export default function BannerTable() {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  // reset to first page when search changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search])

  // filter locally
  const filteredData = useMemo(() => {
    return dummyBanners.filter((item) =>
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
          <h2 className="text-2xl font-semibold">Banners</h2>
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

        {/* Add Banner Button (optional) */}
        <button className="px-4 py-2 bg-black text-white rounded-lg">
          Add Banner
        </button>
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
