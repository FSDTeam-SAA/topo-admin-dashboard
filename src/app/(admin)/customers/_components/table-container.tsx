// ================================================================
// table-container.tsx
// ================================================================
import { DataTable } from '@/components/ui/data-table'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CustomerProfile } from './customer-table-column'

interface TableProps {
  data: CustomerProfile[]
  columns: ColumnDef<CustomerProfile>[]
}

export const TableContainer = ({ data, columns }: TableProps) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <>
      <div className="bg-white">
        <DataTable table={table} columns={columns} />
      </div>
      {/* Pagination can be added here */}
    </>
  )
}
