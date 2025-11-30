// ================================================================
// CustomerTableContainer.tsx
// ================================================================
'use client'

import { useQuery } from '@tanstack/react-query'
import { TableContainer } from './table-container'
import { customerTableColumns, CustomerProfile } from './customer-table-column'

interface CustomerTableContainerProps {
  accessToken: string
}

interface CustomerListResponse {
  status: boolean
  message: string
  data: {
    page: number
    limit: number
    total: number
    customers: CustomerProfile[]
  }
}

export default function CustomerTableContainer({
  accessToken,
}: CustomerTableContainerProps) {
  const fetchCustomers = async (): Promise<CustomerProfile[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/customer/all-customers`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    const data: CustomerListResponse = await response.json()

    if (!data.status) throw new Error('Failed to fetch customers')

    return data.data.customers
  }

  const {
    data: customers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading customers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-600">{(error as Error).message}</div>
      </div>
    )
  }

  return (
    <TableContainer data={customers ?? []} columns={customerTableColumns} />
  )
}
