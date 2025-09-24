'use client'

import React, { useMemo, useState, useEffect } from 'react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Input } from '@/components/ui/input'
import { PaginationControls } from '@/components/ui/pagination-controls'

// Type
type Role = {
  roleId: string
  roleName: string
  permissions: string[]
  adminAssigned: string
  lastActive: string
}

// Dummy Data
const dummyRoles: Role[] = [
  {
    roleId: 'role-101',
    roleName: 'Super Admin',
    permissions: ['Manage Users', 'Manage Roles', 'Full Access'],
    adminAssigned: 'Alice Johnson',
    lastActive: '2025-09-20',
  },
  {
    roleId: 'role-102',
    roleName: 'Editor',
    permissions: ['Edit Content', 'Manage Banners'],
    adminAssigned: 'Michael Smith',
    lastActive: '2025-09-18',
  },
  {
    roleId: 'role-103',
    roleName: 'Viewer',
    permissions: ['Read Only'],
    adminAssigned: 'Sophia Lee',
    lastActive: '2025-09-12',
  },
]

// Columns
const columns: ColumnDef<Role>[] = [
  { accessorKey: 'roleId', header: 'Role ID' },
  { accessorKey: 'roleName', header: 'Role Name' },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    cell: ({ row }) => (
      <div className="flex flex-wrap gap-1 justify-center">
        {row.original.permissions.map((perm, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
          >
            {perm}
          </span>
        ))}
      </div>
    ),
  },
  { accessorKey: 'adminAssigned', header: 'Admin Assigned' },
  {
    accessorKey: 'lastActive',
    header: 'Last Active',
    cell: ({ row }) =>
      new Date(row.original.lastActive).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
  },
  {
    id: 'actions',
    header: 'Action',
    cell: () => (
      <button className="px-3 py-1 text-[13px] rounded-lg bg-black text-white">
        Manage
      </button>
    ),
  },
]

// Main Component
export default function RolesPermissionsTable() {
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })

  // reset page on search
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [search])

  // filter locally
  const filteredData = useMemo(() => {
    return dummyRoles.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
    pageCount: Math.max(
      1,
      Math.ceil(filteredData.length / pagination.pageSize)
    ),
  })

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 py-5">
        <h2 className="text-2xl font-semibold">Roles & Permissions</h2>
        <Input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-[200px]"
        />
      </div>

      {/* Table */}
      <div className="w-full border rounded-2xl overflow-hidden">
        <table className="w-full rounded-xl text-sm">
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-center p-2 text-gray-500 font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 text-gray-900 text-base"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 text-center">
                      <div className="flex justify-center">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-4 text-center text-gray-500"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <PaginationControls
          currentPage={table.getState().pagination.pageIndex + 1}
          totalPages={table.getPageCount()}
          totalItems={filteredData.length}
          itemsPerPage={table.getState().pagination.pageSize}
          onPageChange={(page) => {
            table.setPageIndex(page - 1)
          }}
        />
      </div>
    </div>
  )
}
