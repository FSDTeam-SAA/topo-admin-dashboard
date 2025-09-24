import { Button } from "@/components/ui/button";
import React from "react";

const SettingsAction = () => {
  return (
    <div className="p-5 rounded-lg shadow-sm mt-10 bg-white">
      <h1 className="text-xl font-semibold mb-4">Action</h1>

      <div className="text-sm">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsAction;
