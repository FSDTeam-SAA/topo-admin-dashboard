"use client";
import React from "react";
import FinanceCard from "./finance-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";

interface PerLender {
  _id: string;
  name: string;
  email: string;
  totalRevenue: string;
  totalPaid: string;
  pendingPayout: string;
  avgPayout: string;
  totalRequests: string;
}

interface Global {
  totalRevenue?: string;
  totalPaid?: string;
  totalPending?: string;
  avgPayout?: string;
}

interface LendersPayout {
  perLender: PerLender[];
  global?: Global;
}

const PayoutSummery = ({ token }: { token: string }) => {
  const { data: lendersPayout } = useQuery<LendersPayout>({
    queryKey: ["payout"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/overview/dashboard/finance/payout/stats`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      return data;
    },
    enabled: !!token,
  });

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-8">
        <FinanceCard
          title="Total Paid"
          value={lendersPayout?.global?.totalPaid as string}
        />
        <FinanceCard
          title="Pending Payouts"
          value={lendersPayout?.global?.totalPending as string}
        />
        <FinanceCard
          title="Average Payout"
          value={lendersPayout?.global?.avgPayout as string}
        />
      </div>

      {/* lenders payout */}
      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] p-5 rounded-lg">
        <h1 className="text-2xl font-medium mb-8">Lenders Payout</h1>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Total Revenue</TableHead>
                <TableHead className="text-center">Pending Payout</TableHead>
                <TableHead className="text-center">Avg Payout</TableHead>
                <TableHead className="text-center">Total Requests</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {lendersPayout?.perLender?.map((item) => (
                <TableRow key={item?._id} className="text-center">
                  <TableCell>{item?.name}</TableCell>
                  <TableCell>{item?.email}</TableCell>
                  <TableCell>$ {item?.totalRevenue || "0"}</TableCell>
                  <TableCell>$ {item?.pendingPayout}</TableCell>
                  <TableCell>$ {item?.avgPayout}</TableCell>
                  <TableCell>{item?.totalRequests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* pending payouts */}
      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] p-5 rounded-lg">
        <h1 className="text-2xl font-medium mb-8">Pending Payouts</h1>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Lender ID</TableHead>
                <TableHead className="text-center">Lender Name</TableHead>
                <TableHead className="text-center">Total Paid</TableHead>
                <TableHead className="text-center">Pending Payout</TableHead>
                <TableHead className="text-center">Avg Payout</TableHead>
                <TableHead className="text-center">Revenue Generated</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="text-center">
                <TableCell>Example</TableCell>
                <TableCell>Example</TableCell>
                <TableCell>Example</TableCell>
                <TableCell>Example</TableCell>
                <TableCell>Example</TableCell>
                <TableCell>Example</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PayoutSummery;
