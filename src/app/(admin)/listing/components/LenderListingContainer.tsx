'use client'

import React, { useMemo, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { ListingsGetResponse, Dress } from '@/types/listings'
// import Image from 'next/image'
import DataTablePagination from './../components/DataTablePagination'

interface ListingContainerProps {
  accessToken: string
}

export default function LenderListingContainer({
  accessToken,
}: ListingContainerProps) {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('') //  dropdown-controlled

  // TanStack pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3,
  })

  // Reset to first page when search/status changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search, status])

  // Fetch with react-query
  const { data, isLoading, isError } = useQuery<ListingsGetResponse, Error>({
    queryKey: ['listings', pagination.pageIndex, pagination.pageSize, status],
    queryFn: async (): Promise<ListingsGetResponse> => {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lender/admin`
      )
      url.searchParams.append('page', String(pagination.pageIndex + 1)) // API pages start at 1
      url.searchParams.append('limit', String(pagination.pageSize))
      url.searchParams.append('status', status) // from dropdown

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      })
      if (!res.ok) throw new Error('Failed to fetch')
      return (await res.json()) as ListingsGetResponse
    },
    staleTime: 30_000,
  })

  // Pagination info
  const totalItems = data?.pagination?.totalItems ?? 0

  // Local search filter
  const dresses =
    data?.data?.filter((d) =>
      d.dressName.toLowerCase().includes(search.toLowerCase())
    ) ?? []

  // Table columns
  const columns = useMemo<ColumnDef<Dress>[]>(
    () => [
      {
        accessorKey: 'dressId',
        header: 'Listing ID',
        cell: ({ row }) => row.original.dressId.slice(0, 6),
      },
      // {
      //   accessorKey: 'media',
      //   header: 'Thumbnails',
      //   cell: ({ row }) => (
      //     <div className="w-12 h-16 relative rounded overflow-hidden">
      //       {row.original.media?.[0] && (
      //         <Image
      //           src={row.original.media[0]}
      //           alt={row.original.dressName}
      //           fill
      //           sizes="48px"
      //           className="object-cover"
      //           priority={row.index === 0}
      //         />
      //       )}
      //     </div>
      //   ),
      // }
      {
        accessorKey: 'dressName',
        header: 'Dress Name',
      },
      {
        accessorKey: 'colour',
        header: 'Colour',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: row.original.colour }}
            />
            <span>{row.original?.colour}</span>
          </div>
        ),
      },
      {
        accessorKey: 'approvalStatus',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.original.approvalStatus ?? 'approved'
          const statusColor =
            status === 'approved'
              ? 'bg-green-100 text-green-700'
              : status === 'pending'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
            >
              {status}
            </span>
          )
        },
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
        id: 'actions',
        header: 'Action',
        cell: () => (
          <button className="px-3 py-1 text-sm rounded bg-black text-white">
            View
          </button>
        ),
      },
    ],
    []
  )

  const table = useReactTable({
    data: dresses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(totalItems / pagination.pageSize)),
    state: { pagination },
    onPaginationChange: setPagination,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-lg">Loading listings...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-red-50 rounded-lg">
        <p className="text-red-500 text-lg">Failed to load listings</p>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 py-5">
        <h2 className="text-2xl font-semibold">Lender Listings</h2>
        <div className="flex items-center gap-2">
          {/*  Status Dropdown */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[200px]"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-sm">
        <thead className="border-b">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left p-2 text-gray-600 font-medium"
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
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                No listings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="mt-4">
        <DataTablePagination table={table} totalItems={totalItems} />
      </div>
    </div>
  )
}
