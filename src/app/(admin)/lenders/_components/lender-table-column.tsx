import { cn } from "@/lib/utils";
import { LenderProfile } from "@/types/lender";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const lenderTableColumns: ColumnDef<LenderProfile>[] = [
  {
    accessorKey: "fullName",
    header: "Lender Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      console.log(status);
      return (
        <div
          className={cn(
            status === "approved"
              ? "bg-green-100 text-green-800"
              : status === "rejected"
              ? "bg-red-100 text-red-800"
              : "bg-yellow-100 text-yellow-800",
            "w-fit px-2 py-1 rounded-[50px] "
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "businessName",
  },
  {
    accessorKey: "createdAt",
    header: "Joined At",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      return <div>{moment(createdAt).format("D MMMM, YYYY hh:mm A")}</div>;
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({}) => {
      return <div></div>;
    },
  },
];
