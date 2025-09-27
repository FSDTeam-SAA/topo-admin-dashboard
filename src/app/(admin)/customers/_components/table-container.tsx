import { DataTable } from '@/components/ui/data-table'
// import { CustomerProfile } from '@/types/customers'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { DemoCustomerProfile } from './customer-table-column'

interface TableProps {
  data: DemoCustomerProfile[]
  columns: ColumnDef<DemoCustomerProfile>[]
}

export const TableContainer = ({ data, columns }: TableProps) => {
  // const { page, setPage } = useLenderSearchStore();
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
      {/* {totalPages > 1 && (
        <div className="mt-4 w-full  flex justify-end">
          <PaginationControls
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                totalItems={data.pagination.totalItems}
                itemsPerPage={data.pagination.itemsPerPage}
                onPageChange={(page) => setPage(page)}
              />
        </div>
      )} */}
    </>
  )
}
