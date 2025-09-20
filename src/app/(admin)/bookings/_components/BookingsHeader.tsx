import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import BookingsCard from "./bookings-card";

const BookingsHeader = () => {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <BookingsCard title="Total Bookings" value="$#,###" />
        <BookingsCard title="Total Bookings" value="$#,###" />
        <BookingsCard title="Total Bookings" value="$#,###" />
        <BookingsCard title="Total Bookings" value="$#,###" />
      </div>
    </div>
  );
};

export default BookingsHeader;
