'use client'

import {
  customerTableColumns,
  DemoCustomerProfile,
  demoCustomers,
} from './customer-table-column'
import { TableContainer } from './table-container'

interface CustomerTableContainerProps {
  accessToken: string
}

const CustomerTableContainer = ({
  accessToken,
}: CustomerTableContainerProps) => {
  console.log('accessToken in customer table container', accessToken)

  const data: DemoCustomerProfile[] = demoCustomers

  return <TableContainer data={data} columns={customerTableColumns} />
}

export default CustomerTableContainer
