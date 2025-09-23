import React from "react";
import BookingsHeader from "./_components/BookingsHeader";
import SearchBookings from "./_components/search-bookings";
import BookingsTable from "./_components/bookings-table";
import { auth } from "@/auth";

const page = async () => {
  const cu = await auth();

  const token = cu?.user.accessToken;

  return (
    <div>
      <BookingsHeader />
      <SearchBookings />
      <BookingsTable token={token as string} />
    </div>
  );
};

export default page;
