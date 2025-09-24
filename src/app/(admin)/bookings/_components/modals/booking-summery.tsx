type BookingDetails = {
  id: string;
  customer: {
    firstName: string;
    lastName: string;
  };
  lender: {
    fullName: string;
  };
  listing: {
    dressName: string;
  };
  createdAt: string;
  statusHistory: { _id: string; status: string }[];
  totalAmount: number;
};

const defaultBookingDetails: BookingDetails = {
  id: "",
  customer: { firstName: "", lastName: "" },
  lender: { fullName: "" },
  listing: { dressName: "" },
  createdAt: "",
  statusHistory: [],
  totalAmount: 0,
};

const BookingSummery = ({
  bookingDetails = defaultBookingDetails,
}: {
  bookingDetails?: BookingDetails;
}) => {

  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Booking Summary</h1>

        <div className="text-sm space-y-2">
          <h3>Booking ID: {bookingDetails.id}</h3>
          <h3>
            Customer Name: {bookingDetails.customer.firstName}{" "}
            {bookingDetails.customer.lastName}
          </h3>
          <h3>Lender Name: {bookingDetails.lender.fullName}</h3>
          <h3>Dress Name: {bookingDetails.listing.dressName}</h3>
          <h3>
            Booking Date: 
            {new Date(bookingDetails.createdAt).toLocaleDateString()}
          </h3>
          <h3>
            <span>Status: </span>
            {bookingDetails.statusHistory.map((status) => (
              <span
                key={status._id}
                className={`${
                  status.status === "Pending" && "text-orange-600"
                }`}
              >
                {status.status}
              </span>
            ))}
          </h3>
          <h3>Amount: $ {bookingDetails.totalAmount}</h3>
        </div>
      </div>
    </div>
  );
};

export default BookingSummery;
