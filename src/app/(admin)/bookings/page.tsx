import React from "react";
import BookingsHeader from "./_components/BookingsHeader";
import SearchBookings from "./_components/search-bookings";

const page = () => {
  return (
    <div>
      <BookingsHeader />
      <SearchBookings />
    </div>
  );
};

export default page;
