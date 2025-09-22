import { Button } from "@/components/ui/button";
import React from "react";

const DisputesDetails = () => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <div className="text-sm space-y-2">
          <h3>Issue Type: Minor Damage (Locked)</h3>
          <h3>
            Description: Customer reported a minor stain on the dress after
            return.
          </h3>
          <h3>Submission: 2025-04-23 14:30</h3>
          <h3>Last Communication: 2025-04-24 09:15</h3>
        </div>
      </div>

      <div className="border border-gray-200 p-5 rounded-lg shadow-sm mt-6">
        <div className="text-sm space-y-2">
          <h3 className="text-lg font-semibold">Uploaded Evidence</h3>
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

export default DisputesDetails;
