"use client"
import BookingsHeader from "./BookingsHeader";
import SearchBookings from "./search-bookings";
import BookingsTable from "./bookings-table";

const Bookings = ({ token }: { token: string }) => {
  return (
    <div>
      <BookingsHeader />
      <SearchBookings />
      <BookingsTable token={token as string} />
    </div>
  );
};

export default Bookings;
