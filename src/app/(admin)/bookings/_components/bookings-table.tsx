import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const BookingsTable = () => {
  return (
    <div className="bg-white p-5 rounded-lg mt-8 shadow-[0px_4px_10px_0px_#0000001A]">
      <Table>
        <TableHeader>
          <TableRow className="border-none">
            <TableHead className="w-[100px] text-center">Booking ID</TableHead>
            <TableHead className="w-[100px] text-center">Customer ID</TableHead>
            <TableHead className="w-[100px] text-center">Lender ID</TableHead>
            <TableHead className="w-[100px] text-center">Dress ID</TableHead>
            <TableHead className="w-[100px] text-center">Booking Date</TableHead>
            <TableHead className="w-[100px] text-center">Amount</TableHead>
            <TableHead className="w-[100px] text-center">Status</TableHead>
            <TableHead className="w-[100px] text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell className="text-center">#####</TableCell>
            <TableCell className="text-center">#####</TableCell>
            <TableCell className="text-center">#####</TableCell>
            <TableCell className="text-center">#####</TableCell>
            <TableCell className="text-center">{new Date().toLocaleDateString()}</TableCell>
            <TableCell className="text-center">$###</TableCell>
            <TableCell className="text-center">
              <button className="bg-blue-200 px-2 rounded-3xl text-blue-600 font-semibold text-xs py-1">
                Disputed
              </button>
            </TableCell>

            <TableCell className="text-center space-x-5">
              <Button>View</Button>
              <Button variant="outline">Escalate</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingsTable;
