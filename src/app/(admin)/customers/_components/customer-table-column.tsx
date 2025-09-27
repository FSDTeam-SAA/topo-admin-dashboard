'use client'

import { cn } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import moment from 'moment'
import CustomerAction from './customer-action'

export interface DemoCustomerProfile {
  customerId: string
  customerName: string
  status: 'active' | 'inactive' | 'pending'
  totalBookings: number
  totalSpent: number
  joinedAt: string
  email: string
  phoneNumber: number
  address: string
  businessAddress: string
  postCode: string
  statusHistory?: [
    {
      current: string
      lastUpdated: string
    }
  ]
}

export const demoCustomers: DemoCustomerProfile[] = [
  {
    customerId: 'CUST-001',
    customerName: 'John Doe',
    status: 'active',
    totalBookings: 12,
    totalSpent: 540,
    joinedAt: '2025-01-10T09:30:00Z',
    email: 'john@gmail.com',
    phoneNumber: 23423423,
    address: 'Lisbon, London, UK',
    businessAddress: '123 Baker Street, London',
    postCode: 'NW1 6XE',
    statusHistory: [
      {
        current: 'inactive',
        lastUpdated: '025-01-10T09:30:00Z',
      },
    ],
  },
  {
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    status: 'pending',
    totalBookings: 5,
    totalSpent: 220,
    joinedAt: '2025-02-15T14:00:00Z',
    email: 'jane.smith@gmail.com',
    phoneNumber: 441234567890,
    address: '221B Baker Street, London, UK',
    businessAddress: '45 Oxford Street, London',
    postCode: 'W1D 2LT',
    statusHistory: [
      {
        current: 'inactive',
        lastUpdated: '025-01-10T09:30:00Z',
      },
    ],
  },
  {
    customerId: 'CUST-003',
    customerName: 'Michael Brown',
    status: 'active',
    totalBookings: 20,
    totalSpent: 1300,
    joinedAt: '2024-12-20T11:45:00Z',
    email: 'michael.brown@yahoo.com',
    phoneNumber: 441234987654,
    address: 'Manchester, UK',
    businessAddress: '12 King Street, Manchester',
    postCode: 'M2 6AQ',
    statusHistory: [
      {
        current: 'inactive',
        lastUpdated: '025-01-10T09:30:00Z',
      },
    ],
  },
  {
    customerId: 'CUST-004',
    customerName: 'Emily Johnson',
    status: 'inactive',
    totalBookings: 8,
    totalSpent: 640,
    joinedAt: '2025-03-01T10:20:00Z',
    email: 'emily.johnson@hotmail.com',
    phoneNumber: 441111222333,
    address: 'Birmingham, UK',
    businessAddress: '56 High Street, Birmingham',
    postCode: 'B4 7SL',
    statusHistory: [
      {
        current: 'inactive',
        lastUpdated: '025-01-10T09:30:00Z',
      },
    ],
  },
  {
    customerId: 'CUST-005',
    customerName: 'David Wilson',
    status: 'active',
    totalBookings: 15,
    totalSpent: 980,
    joinedAt: '2025-01-25T08:15:00Z',
    email: 'david.wilson@gmail.com',
    phoneNumber: 441555666777,
    address: 'Liverpool, UK',
    businessAddress: '89 Market Street, Liverpool',
    postCode: 'L1 1HT',
    statusHistory: [
      {
        current: 'inactive',
        lastUpdated: '025-01-10T09:30:00Z',
      },
    ],
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
    header: 'Total Spent',
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
    cell: ({ row }) => {
      return <CustomerAction data={row.original} />
    },
  },
]
