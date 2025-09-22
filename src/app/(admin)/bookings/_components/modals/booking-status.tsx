import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

const BookingStatus = () => {
  return (
    <div className="mt-5">
      <div className="border border-gray-200 p-5 rounded-lg shadow-sm">
        <h1 className="text-xl mb-4">Booking Status</h1>

        <div className="text-sm space-y-2">
          <h3>Current Status: Active</h3>
          <h3>Last Updated: Apr 15, 2025</h3>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="mb-2">Update Status</h1>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="dispute">Dispute</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h1 className="mb-2">Reason for Change</h1>
        <Textarea className="h-[150px]" />
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

export default BookingStatus;
