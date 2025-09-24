import { Input } from "@/components/ui/input";
import React from "react";

const ContactInformation = () => {
  return (
    <div className="p-6 bg-white shadow-[0px_4px_10px_0px_#0000001A] rounded-lg">
      <h1 className="text-xl ">Contact Information</h1>

      <div  className="mt-5 grid grid-cols-2 items-center gap-8">
        <div >
          <h1 className="mb-2">Full Name</h1>
          <Input className="focus-visible:ring-0" placeholder="Enter Full Name" />
        </div>

        <div>
          <h1 className="mb-2">Email</h1>
          <Input className="focus-visible:ring-0" placeholder="Enter Email Address" />
        </div>

        <div>
          <h1 className="mb-2">Phone Number</h1>
          <Input className="focus-visible:ring-0" placeholder="Enter Phone Number" />
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
