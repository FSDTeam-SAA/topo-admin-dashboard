import { Input } from "@/components/ui/input";
import React from "react";

const PasswordSecurity = () => {
  return (
    <div className="p-6 bg-white shadow-[0px_4px_10px_0px_#0000001A] rounded-lg">
      <h1 className="text-xl ">Password & Security</h1>

      <div className="mt-5 grid grid-cols-2 items-center gap-8">
        <div>
          <h1 className="mb-2">Current Password</h1>
          <Input
            className="focus-visible:ring-0"
            placeholder="Enter Current Password"
          />
        </div>

        <div></div>

        <div>
          <h1 className="mb-2">New Password</h1>
          <Input
            className="focus-visible:ring-0"
            placeholder="Enter New Password"
          />
        </div>

        <div>
          <h1 className="mb-2">Confirm New Password</h1>
          <Input className="focus-visible:ring-0" placeholder="Confirm New Password" />
        </div>
      </div>
    </div>
  );
};

export default PasswordSecurity;
