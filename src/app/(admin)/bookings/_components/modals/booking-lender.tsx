import { Button } from "@/components/ui/button";
import React from "react";

const BookingLender = () => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Lender Details</h1>

        <div className="text-sm space-y-2">
          <h3>Lender ID: ####</h3>
          <h3>Name: Sarah K.</h3>
          <h3>Email: sarah@example.com</h3>
          <h3>Dress Name: Zimmermann Silk Gown</h3>
          <h3>Phone: +1 555-123-4567</h3>

          <div className="mt-5">
            <Button>View Profile</Button>
          </div>
        </div>
      </div>

      <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-10">
        <h1 className="text-xl font-semibold mb-4">Actions</h1>

        <div className="text-sm flex items-center gap-5">
          <Button>Save Changes</Button>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>
    </div>
  );
};

export default BookingLender;
