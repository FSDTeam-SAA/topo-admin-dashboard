import { Button } from "@/components/ui/button";
import React from "react";

const BookingSnapShot = () => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <div className="text-sm space-y-2">
          <h3>Booking ID: #10243</h3>
          <h3>Dress Name: Floral Maxi Dress</h3>
          <h3>Dates: 2025-04-20 to 2025-04-22</h3>
          <h3>Size: M</h3>
          <h3>Customer: Jane Doe (jane.doe@email.com, 555-123-4567)</h3>
          <h3>Lender: Sophie K. (sophie.k@email.com, 555-987-6543)</h3>
          <h3>Delivery Method: Pickup</h3>
          <h3>Insurance Status: Yes</h3>
        </div>
      </div>

      <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-10">
        <h1 className="text-xl font-semibold mb-4">Actions</h1>

        <div className="text-sm flex items-center gap-5">
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
