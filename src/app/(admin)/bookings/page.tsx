import React from "react";
import BookingsHeader from "./_components/BookingsHeader";
import SearchBookings from "./_components/search-bookings";
import BookingsTable from "./_components/bookings-table";

const page = () => {
  return (
    <div>
      <BookingsHeader />
      <SearchBookings />
      <BookingsTable />
    </div>
  );
};

export default page;
