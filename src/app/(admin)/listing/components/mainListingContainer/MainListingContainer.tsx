'use client'

import { DataTable } from '@/components/ui/data-table'
import { PaginationControls } from '@/components/ui/pagination-controls'
import { useQuery } from '@tanstack/react-query'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { Dress, ListingsGetResponse } from '../../types/listtingsResponseTypes' // your new dress types
import { useLenderSearchStore } from '@/app/(admin)/lenders/_components/state/index'
import ActionCell from '../ActionCell'

interface ListingContainerProps {
  accessToken: string
  isSiteListings: boolean
}

// ---- Table Columns ----
export const listingTableColumns: ColumnDef<Dress>[] = [
  { accessorKey: 'dressId', header: 'Listing ID' },
  {
    accessorKey: 'media',
    header: 'Thumbnail',
    cell: ({ row }) => (
      <Image
        src={row.original.media?.[0]}
        alt={row.original.dressName}
        width={48}
        height={64}
        unoptimized
        className="object-cover rounded"
      />
    ),
  },
  { accessorKey: 'dressName', header: 'Dress Name' },
  { accessorKey: 'brand', header: 'Brand' },
  { accessorKey: 'size', header: 'Size' },
  { accessorKey: 'colour', header: 'Colour' },
  { accessorKey: 'status', header: 'Status' },
  {
    accessorKey: 'updatedAt',
    header: 'Last Updated',
    cell: ({ row }) => (
      <span>
        {new Date(row.original.updatedAt).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    ),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: ({ row }) => <ActionCell listing={row.original} />,
  },
]

// ---- Main Container ----
const MainListingContainer = ({ accessToken }: ListingContainerProps) => {
  const { page } = useLenderSearchStore()

  const { data, isLoading, isError, error } = useQuery<ListingsGetResponse>({
    queryKey: ['dresses', page],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lender?page=1&limit=10`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((res) => res.json()),
  })

  console.log(data?.data)

  let content

  if (isLoading) {
    content = (
      <div className="h-[400px] flex justify-center items-center flex-col">
        <Loader2 className="animate-spin opacity-80" />
        <p>Please wait...</p>
      </div>
    )
  } else if (isError) {
    content = (
      <div className="min-h-[300px] flex flex-col items-center justify-center text-red-600 dark:text-red-400 text-center space-y-2">
        <AlertTriangle size={32} />
        <p className="text-lg font-medium">Failed to load listings</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {error?.message || 'Something went wrong. Please try again later.'}
        </p>
      </div>
    )
  } else if (data?.data) {
    content = (
      <TableContainer
        data={data.data}
        columns={listingTableColumns}
        totalPages={data.pagination.totalPages}
      />
    )
  }

  return <div>{content}</div>
}

export default MainListingContainer

// ---- Table Wrapper ----
interface TableProps {
  data: Dress[]
  columns: ColumnDef<Dress>[]
  totalPages: number
}

const TableContainer = ({ data, columns, totalPages }: TableProps) => {
  const { page, setPage } = useLenderSearchStore()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="bg-white">
        <DataTable table={table} columns={columns} />
      </div>
      {totalPages > 1 && (
        <div className="mt-4 w-full flex justify-end">
          <PaginationControls
            currentPage={page}
            onPageChange={(page) => setPage(page)}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  )
}
