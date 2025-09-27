'use client'

import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'

export interface DemoCustomerProfile {
  customerId: string
  customerName: string
  status: 'active' | 'inactive' | 'pending'
  totalBookings: number
  totalSpent: number
  joinedAt: string
}

// Demo Data
export const demoCustomers: DemoCustomerProfile[] = [
  {
    customerId: 'CUST-001',
    customerName: 'John Doe',
    status: 'active',
    totalBookings: 12,
    totalSpent: 540,
    joinedAt: '2025-01-10T09:30:00Z',
  },
  {
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    status: 'pending',
    totalBookings: 5,
    totalSpent: 220,
    joinedAt: '2025-02-15T14:00:00Z',
  },
  {
    customerId: 'CUST-003',
    customerName: 'Michael Brown',
    status: 'active',
    totalBookings: 20,
    totalSpent: 1300,
    joinedAt: '2024-12-20T11:45:00Z',
  },
  {
    customerId: 'CUST-003',
    customerName: 'Michael Brown',
    status: 'inactive',
    totalBookings: 20,
    totalSpent: 1300,
    joinedAt: '2024-12-20T11:45:00Z',
  },
  {
    customerId: 'CUST-003',
    customerName: 'Michael Brown',
    status: 'active',
    totalBookings: 20,
    totalSpent: 1300,
    joinedAt: '2024-12-20T11:45:00Z',
  },
]

// Table Columns
export const customerTableColumns: ColumnDef<DemoCustomerProfile>[] = [
  {
    accessorKey: 'customerId',
    header: 'Customer ID',
  },
  {
    accessorKey: 'customerName',
    header: 'Customer Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div
          className={cn(
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : status === 'inactive'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800',
            'w-fit px-3 py-1 rounded-[50px] mx-auto'
          )}
        >
          {status}
        </div>
      )
    },
  },
  {
    accessorKey: 'totalBookings',
    header: 'Total Bookings',
  },
  {
    accessorKey: 'totalSpent',
    header: 'Total Spent ($)',
  },
  {
    accessorKey: 'joinedAt',
    header: 'Joined At',
    cell: ({ row }) => {
      return (
        <div>{moment(row.original.joinedAt).format('D MMM YYYY hh:mm A')}</div>
      )
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({}) => (
      <button className="py-1 bg-black text-white px-4  rounded-lg">
        View
      </button>
    ),
  },
]
