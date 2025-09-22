import { Button } from "@/components/ui/button";
import React from "react";

const BookingSummery = () => {
  return (
    <div className="mt-2">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Booking Summary</h1>

        <div className="text-sm space-y-2">
          <h3>Booking ID: #10243</h3>
          <h3>Customer Name: Sarah K.</h3>
          <h3>Lender Name: Jane D.</h3>
          <h3>Dress Name: Zimmermann Silk Gown</h3>
          <h3>Booking Date: Apr 15, 2025</h3>
          <h3>Status: Active</h3>
          <h3>Amount: $150</h3>
        </div>
      </div>

      <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-10">
        <h1 className="text-xl font-semibold mb-4">Actions</h1>

        <div className="text-sm flex items-center gap-5">
          <Button>Save Changes</Button>
          <Button variant="outline">Send Message</Button>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummery;
