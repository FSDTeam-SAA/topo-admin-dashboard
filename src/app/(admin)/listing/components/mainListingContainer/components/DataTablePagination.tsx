'use client'

import * as React from 'react'
import { Table as ReactTable } from '@tanstack/react-table'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props<TData> = {
  table: ReactTable<TData>
  /** total items (optional, falls back to table.getPrePaginationRowModel().rows.length if not given) */
  totalItems?: number
  /** page size options */
  pageSizeOptions?: number[]
}

export default function DataTablePagination<TData>({
  table,
  totalItems,
  pageSizeOptions = [5, 10, 20, 50],
}: Props<TData>) {
  const { pageIndex, pageSize } = table.getState().pagination
  const total =
    typeof totalItems === 'number'
      ? totalItems
      : table.getPrePaginationRowModel().rows.length

  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const start = total === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(total, (pageIndex + 1) * pageSize)

  const canPrev = pageIndex > 0
  const canNext = pageIndex < pageCount - 1

  const pages = React.useMemo<(number | 'ellipsis')[]>(() => {
    if (pageCount <= 7) return [...Array(pageCount)].map((_, i) => i)
    if (pageIndex <= 3) return [0, 1, 2, 3, 'ellipsis', pageCount - 1]
    if (pageIndex >= pageCount - 4)
      return [
        0,
        'ellipsis',
        pageCount - 4,
        pageCount - 3,
        pageCount - 2,
        pageCount - 1,
      ]
    return [
      0,
      'ellipsis',
      pageIndex - 1,
      pageIndex,
      pageIndex + 1,
      'ellipsis',
      pageCount - 1,
    ]
  }, [pageIndex, pageCount])

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left: range text */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-medium">{start}</span> to{' '}
        <span className="font-medium">{end}</span> of{' '}
        <span className="font-medium">{total}</span> results
      </p>

      {/* Right: page size + pagination */}
      <div className="flex items-center gap-4">
        {/* Page size */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => table.setPageSize(Number(v))}
          >
            <SelectTrigger className="w-[84px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pagination numbers */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={!canPrev ? 'pointer-events-none opacity-50' : ''}
                onClick={() => canPrev && table.previousPage()}
              />
            </PaginationItem>

            {pages.map((p, idx) =>
              p === 'ellipsis' ? (
                <PaginationItem key={`e-${idx}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === pageIndex}
                    onClick={() => table.setPageIndex(p)}
                  >
                    {p + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                className={!canNext ? 'pointer-events-none opacity-50' : ''}
                onClick={() => canNext && table.nextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
