/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

interface BookingSnapShotProps {
  disputesDetails: any;
  isLoading: boolean;
}

const BookingSnapShot = ({ disputesDetails, isLoading }: BookingSnapShotProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Skeleton components
  const InfoSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-4 w-56" />
      <Skeleton className="h-4 w-52" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-60" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-36" />
    </div>
  );

  const ButtonSkeleton = () => (
    <div className="flex items-center gap-5 flex-wrap">
      <Skeleton className="h-9 w-32" />
      <Skeleton className="h-9 w-40" />
      <Skeleton className="h-9 w-36" />
      <Skeleton className="h-9 w-28" />
    </div>
  );

  if (isLoading) {
    return (
      <div className="mt-5">
        <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
          <InfoSkeleton />
        </div>

        <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-10">
          <Skeleton className="h-6 w-24 mb-4" />
          <ButtonSkeleton />
        </div>
      </div>
    );
  }

  const booking = disputesDetails?.booking;
  const customer = booking?.customer;
  const lender = booking?.lender;

  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <div className="text-sm space-y-2">
          <h3 className="font-medium">
            Booking ID:{" "}
            <span className="font-normal text-gray-600">
              {booking?._id ? `#${booking._id}` : "N/A"}
            </span>
          </h3>
          <h3 className="font-medium">
            Dress Name:{" "}
            <span className="font-normal text-gray-600">
              {booking?.listing?.title || "Floral Maxi Dress"}
            </span>
          </h3>
          <h3 className="font-medium">
            Dates:{" "}
            <span className="font-normal text-gray-600">
              {disputesDetails?.createdAt ? formatDate(disputesDetails.createdAt) : "2025-04-20 to 2025-04-22"}
            </span>
          </h3>
          <h3 className="font-medium">
            Size:{" "}
            <span className="font-normal text-gray-600">
              {booking?.listing?.size || "M"}
            </span>
          </h3>
          <h3 className="font-medium">
            Customer:{" "}
            <span className="font-normal text-gray-600">
              {customer ? `${customer.firstName} ${customer.lastName}` : "Jane Doe"} 
              {customer?.email && ` (${customer.email})`}
              {customer?.phone && `, ${customer.phone}`}
            </span>
          </h3>
          <h3 className="font-medium">
            Lender:{" "}
            <span className="font-normal text-gray-600">
              {lender ? `${lender.firstName} ${lender.lastName}` : "Sophie K."}
              {lender?.email && ` (${lender.email})`}
              {lender?.phone && `, ${lender.phone}`}
            </span>
          </h3>
          <h3 className="font-medium">
            Delivery Method:{" "}
            <span className="font-normal text-gray-600">
              {booking?.deliveryMethod || "Pickup"}
            </span>
          </h3>
          <h3 className="font-medium">
            Insurance Status:{" "}
            <span className="font-normal text-gray-600">
              {booking?.insurance ? "Yes" : "No"}
            </span>
          </h3>
          <h3 className="font-medium">
            Issue Type:{" "}
            <span className="font-normal text-gray-600">
              {disputesDetails?.issueType || "N/A"}
            </span>
          </h3>
          <h3 className="font-medium">
            Dispute Status:{" "}
            <span className="font-normal text-gray-600">
              {disputesDetails?.status || "N/A"}
            </span>
          </h3>
          <h3 className="font-medium">
            Created:{" "}
            <span className="font-normal text-gray-600">
              {disputesDetails?.createdAt ? formatDate(disputesDetails.createdAt) : "N/A"}
            </span>
          </h3>
        </div>
      </div>

      <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-10">
        <h1 className="text-xl font-semibold mb-4">Actions</h1>

        <div className="text-sm flex items-center gap-5 flex-wrap">
          <Button>Save Changes</Button>
          <Button variant="outline">Submit Resolution</Button>
          <Button variant="outline">Download Report</Button>
          <Button variant="outline">Refund</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSnapShot;