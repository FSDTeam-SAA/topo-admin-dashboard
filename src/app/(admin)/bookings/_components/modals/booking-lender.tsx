interface Lender {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface Listing {
  dressName: string;
}

interface BookingDetails {
  lender?: Lender;
  listing?: Listing;
}

interface Props {
  bookingDetails?: BookingDetails;
}

const BookingLender = ({ bookingDetails = {} }: Props) => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Lender Details</h1>

        <div className="text-sm space-y-2">
          <h3>Lender ID: {bookingDetails.lender?._id}</h3>
          <h3>Name: {bookingDetails.lender?.fullName}</h3>
          <h3>Email: {bookingDetails.lender?.email}</h3>
          <h3>Dress Name: {bookingDetails.listing?.dressName}</h3>
          <h3>Phone: {bookingDetails.lender?.phoneNumber}</h3>
        </div>
      </div>
    </div>
  );
};

export default BookingLender;
