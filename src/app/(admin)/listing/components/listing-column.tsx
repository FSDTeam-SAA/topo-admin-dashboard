import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import Link from 'next/link'
import { Listing } from '../types/listingsTypes'

export const listingColumn: ColumnDef<Listing>[] = [
  {
    accessorKey: 'dressId',
    header: 'Listing ID',
    cell: ({ row }) => row.original.dressId.slice(0, 6),
  },
  {
    accessorKey: 'media',
    header: 'Thumbnails',
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        <div className="w-12 h-16 relative rounded overflow-hidden flex">
          {row.original.media?.[0] && (
            <Image
              src={row.original.media[0]}
              alt={row.original.dressName}
              fill
              sizes="48px"
              className="object-cover"
              priority={row.index === 0}
            />
          )}
        </div>
      </div>
    ),
  },
  { accessorKey: 'dressName', header: 'Dress Name' },
  { accessorKey: 'brand', header: 'Brand' },
  { accessorKey: 'size', header: 'Size' },
  {
    accessorKey: 'colour',
    header: 'Colour',
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border"
            style={{ backgroundColor: row.original.colour }}
          />
          <span>{row.original?.colour}</span>
        </div>
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
          : 'bg-gray-100 text-gray-700'

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
    cell: ({ row }) => (
      <Button className="px-3 py-1 text-sm rounded bg-black text-white">
        <Link href={`/listing/${row.original._id}`}>View</Link>
      </Button>
    ),
  },
]
