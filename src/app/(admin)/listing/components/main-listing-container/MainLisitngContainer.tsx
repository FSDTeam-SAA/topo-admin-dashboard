'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EmptyContainer from '@/components/ui/custom/empty-container'
import ErrorContainer from '@/components/ui/custom/error-container'
import FancyLoader from '@/components/ui/custom/fancy-loader'
import { DataTable } from '@/components/ui/data-table'
import { Input } from '@/components/ui/input'
import { PaginationControls } from '@/components/ui/pagination-controls'
import useDebounce from '@/hook/useDebounce'
import { useMainSiteListingState } from '@/state/listing/use-search-listing-state'
import { useQuery } from '@tanstack/react-query'
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Listing } from '../../types/listingsTypes'
import { listingColumn } from '../listing-column'

interface Props {
  accessToken: string
}

interface APiProps {
  status: boolean
  message: string

  data: Listing[]

  pagination: {
    currentPage: number
    itemsPerPage: number
    totalItems: number
    totalPages: number
  }
}

const MainLisitngContainer = ({ accessToken }: Props) => {
  const { searchQuery, setPage, page } = useMainSiteListingState()
  const debouncedValue = useDebounce(searchQuery, 500)

  const { data, isLoading, isError, error } = useQuery<APiProps>({
    queryKey: ['main-listing', debouncedValue, page],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lender/admin?status=approved&limit=10&page=${page}&search=${debouncedValue}`,
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      ).then((res) => res.json()),
  })

  const table = useReactTable({
    data: data?.data ?? [],
    columns: listingColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  let content

  if (isLoading) {
    content = (
      <FancyLoader message="Fetching approved listings, please wait..." />
    )
  } else if (isError) {
    content = <ErrorContainer message={(error as Error).message} />
  } else if (data && data.data.length === 0) {
    content = <EmptyContainer message="No approved listings found." />
  } else if (data && data.data && data.data.length > 0) {
    content = (
      <div className="bg-white">
        <DataTable table={table} columns={listingColumn} />
      </div>
    )
  }

  return (
    <Card>
      <MainListingHeader />
      <CardContent>
        {content}
        <div>
          {data?.pagination && (
            <div className="mt-4 w-full flex justify-end">
              <PaginationControls
                currentPage={data.pagination.currentPage}
                totalPages={data.pagination.totalPages}
                totalItems={data.pagination.totalItems}
                itemsPerPage={data.pagination.itemsPerPage}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default MainLisitngContainer

const MainListingHeader = () => {
  const { searchQuery, setSearchQuery } = useMainSiteListingState()

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Approved Listings</CardTitle>
        <div className="flex items-center gap-x-5">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by dress name"
          />
        </div>
      </div>
    </CardHeader>
  )
}
