"use client";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import BookingsCard from "./bookings-card";
import { useQuery } from "@tanstack/react-query";

const BookingsHeader = () => {
  const { data: bookingStates = {}, isLoading } = useQuery({
    queryKey: ["bookings-stats"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/stats`
      );
      const data = await res.json();
      return data.data;
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] tracking-[0.5rem] uppercase font-medium">
          Manage Bookings
        </h1>
        <Button>
          Download Report <Download />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
        <BookingsCard
          title="Total Bookings"
          value={bookingStates.totalBookingsCount}
          isLoading={isLoading}
        />
        <BookingsCard
          title="Paid Bookings"
          value={bookingStates.paidBookingCount}
          isLoading={isLoading}
        />
        <BookingsCard
          title="Total Bookings Amount"
          value={`$ ${bookingStates.totalBookingsAmount}`}
          isLoading={isLoading}
        />
        <BookingsCard
          title="Paid Bookings Amount"
          value={`$ ${bookingStates.paidBookingsAmount}`}
          isLoading={isLoading}
        />
        <BookingsCard
          title="Total Profit"
          value={`$ ${bookingStates.totalProfit}`}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default BookingsHeader;
