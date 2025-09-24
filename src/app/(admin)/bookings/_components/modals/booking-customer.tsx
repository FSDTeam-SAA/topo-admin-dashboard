interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Listing {
  dressName: string;
}

interface BookingDetails {
  customer?: Customer;
  listing?: Listing;
}

interface Props {
  bookingDetails?: BookingDetails;
}

const BookingCustomer = ({ bookingDetails = {} }: Props) => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Customer Details</h1>

        <div className="text-sm space-y-2">
          <h3>Customer ID: {bookingDetails.customer?._id}</h3>
          <h3>
            Name: {bookingDetails.customer?.firstName}{" "}
            {bookingDetails.customer?.lastName}
          </h3>
          <h3>Email: {bookingDetails.customer?.email}</h3>
          <h3>Dress Name: {bookingDetails.listing?.dressName}</h3>
          <h3>Phone: {bookingDetails.customer?.phoneNumber}</h3>
        </div>
      </div>
    </div>
  );
};

export default BookingCustomer;
