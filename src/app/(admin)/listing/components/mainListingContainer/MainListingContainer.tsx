'use client'

import React from 'react'
import MainListingHeader from './components/MainListingHeader'
import { Card, CardContent } from '@/components/ui/card'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import { DataTable } from '@/components/ui/data-table'
import DataTablePagination from './components/DataTablePagination'
import Image from 'next/image'

// ---- demo data (no API) ----
type Listing = {
  id: string
  thumbnail: string
  name: string
  brand: string
  size: string
  colour: string
  lenders: number
  status: string
  updated: string
}

// container props
interface ListingContainerProps {
  isSiteListings: boolean
}

const demoData: Listing[] = Array.from({ length: 42 }).map((_, i) => ({
  id: `#${String(i + 1).padStart(5, '0')}`,
  thumbnail: '/img1.jpg',
  name: `Dress ${i + 1}`,
  brand: 'Brand Name',
  size: ['XS', 'S', 'M', 'L', 'XL'][i % 5],
  colour: ['Red', 'Blue', 'Green', 'Black', 'White'][i % 5],
  lenders: (i % 7) + 1,
  status: i % 3 === 0 ? 'Paused' : 'Active',
  updated: 'Apr ##, 2025',
}))

const columns: ColumnDef<Listing>[] = [
  { accessorKey: 'id', header: 'Listing ID' },
  {
    accessorKey: 'thumbnail',
    header: 'Thumbnails',
    cell: ({ row }) => (
      // Use Next.js Image if you like; plain img here for brevity
      <Image
        src={row.original.thumbnail}
        alt={row.original.name}
        width={48} // w-12 = 48px
        height={64} // h-16 = 64px
        className="object-cover rounded"
      />
    ),
  },
  { accessorKey: 'name', header: 'Dress Name' },
  { accessorKey: 'brand', header: 'Brand' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'colour', header: 'Colour' },
  { accessorKey: 'lenders', header: 'Lenders' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'updated', header: 'Last Updated' },
]

export default function MainListingContainer({
  isSiteListings,
}: ListingContainerProps) {
  const table = useReactTable({
    data: demoData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageIndex: 0, pageSize: 3 },
    },
  })

  return (
    <Card>
      <CardContent className="p-5 space-y-5">
        <MainListingHeader isSiteListings={isSiteListings} />
        <DataTable table={table} columns={columns} />
        <DataTablePagination table={table} totalItems={demoData.length} />
      </CardContent>
    </Card>
  )
}
