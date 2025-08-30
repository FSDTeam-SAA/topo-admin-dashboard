"use client";

import ErrorPage from "@/components/error/ErrorPage";
import SkeletonLoader from "@/components/loader/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dress, ListingsGetResponse } from "@/types/listings";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import DataTablePagination from "./../components/DataTablePagination";

interface ListingContainerProps {
  accessToken: string;
}

export default function LenderListingContainer({
  accessToken,
}: ListingContainerProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // dropdown-controlled

  const router = useRouter();

  // TanStack pagination state
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // Reset page when filters change
  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [search, status]);

  // Debounced search setter (memoized)
  const debouncedSetSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearch(val);
      }, 500),
    []
  );

  // Fetch with react-query
  const { data, isLoading, isError } = useQuery<ListingsGetResponse, Error>({
    queryKey: ["listings", pagination.pageIndex, pagination.pageSize, status],
    queryFn: async (): Promise<ListingsGetResponse> => {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/lender/admin`
      );
      url.searchParams.append("page", String(pagination.pageIndex + 1));
      url.searchParams.append("limit", String(pagination.pageSize));
      url.searchParams.append("status", status);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch");
      return (await res.json()) as ListingsGetResponse;
    },
    staleTime: 30_000,
  });

  const totalItems = data?.pagination?.totalItems ?? 0;

  // Local filtering
  const dresses =
    data?.data?.filter((d) =>
      d.dressName.toLowerCase().includes(search.toLowerCase())
    ) ?? [];

  // Table columns
  const columns = useMemo<ColumnDef<Dress>[]>(
    () => [
      {
        accessorKey: "dressId",
        header: "Listing ID",
        cell: ({ row }) => row.original.dressId.slice(0, 6),
      },
      {
        accessorKey: "dressName",
        header: "Dress Name",
      },
      {
        accessorKey: "colour",
        header: "Colour",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full border"
              style={{ backgroundColor: row.original.colour }}
            />
            <span>{row.original?.colour}</span>
          </div>
        ),
      },
      {
        accessorKey: "approvalStatus",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.approvalStatus ?? "approved";
          const statusColor =
            status === "approved"
              ? "bg-green-100 text-green-700"
              : status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700";

          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Last Updated",
        cell: ({ row }) =>
          new Date(row.original.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
      },
      {
        id: "actions",
        header: "Action",
        cell: ({ row }) => (
          <Button
            size="sm"
            className="px-3 py-1 text-sm rounded bg-black text-white"
            onClick={() => router.push(`/listing/${row.original._id}`)}
          >
            View
          </Button>
        ),
      },
    ],
    [router]
  );

  const table = useReactTable({
    data: dresses,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.max(1, Math.ceil(totalItems / pagination.pageSize)),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  if (isLoading) {
    return (
      <div>
        <SkeletonLoader title="Loading lender listings..." />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorPage errorMessage="Failed to load listings. Please try again later." />
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3 py-5">
        <h2 className="text-2xl font-semibold">Lender Listings</h2>
        <div className="flex items-center gap-2">
          {/*  Status Dropdown */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search..."
            onChange={(e) => debouncedSetSearch(e.target.value)}
            className="w-[200px]"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full border-collapse text-sm">
        <thead className="border-b">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left p-2 text-gray-600 font-medium"
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
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                No listings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Component */}
      <div className="mt-4">
        <DataTablePagination table={table} totalItems={totalItems} />
      </div>
    </div>
  );
}
