'use client'

import { useQuery } from '@tanstack/react-query'
import { DataTable } from '@/components/ui/data-table'
import DataTablePagination from './DataTablePagination'
import ActionCell from './ActionCell'
import { ListingFormData } from './ListingForm'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from '@tanstack/react-table'

interface Props {
  accessToken: string
}

export default function LenderTableContainer({ accessToken }: Props) {
  const { data = [], isLoading } = useQuery({
    queryKey: ['lender-listings'],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/lender/listings`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      if (!res.ok) throw new Error('Failed to fetch lender listings')
      return res.json()
    },
  })

  const columns: ColumnDef<ListingFormData>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'dressName', header: 'Dress Name' },
    { accessorKey: 'brand', header: 'Brand' },
    { accessorKey: 'size', header: 'Size' },
    { accessorKey: 'colour', header: 'Colour' },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => <ActionCell listing={row.original} />,
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (isLoading) return <p>Loading Lender Listings...</p>

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  )
}
