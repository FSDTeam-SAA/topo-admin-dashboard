import { Input } from "@/components/ui/input";
import React from "react";

const BankInformation = () => {
  return (
    <div className="p-6 bg-white shadow-[0px_4px_10px_0px_#0000001A] rounded-lg">
      <h1 className="text-xl ">Bank Information</h1>

      <div className="mt-5 grid grid-cols-2 items-center gap-8">
        <div>
          <h1 className="mb-2">Account Name</h1>
          <Input
            className="focus-visible:ring-0"
            placeholder="Enter Account Name"
          />
        </div>

        <div>
          <h1 className="mb-2">Account Number</h1>
          <Input
            className="focus-visible:ring-0"
            placeholder="Enter Account Number"
          />
        </div>

        <div>
          <h1 className="mb-2">BSB</h1>
          <Input
            className="focus-visible:ring-0"
            placeholder="Enter BSB"
          />
        </div>
      </div>
    </div>
  );
};

export default BankInformation;
