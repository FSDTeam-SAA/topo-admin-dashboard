import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import React from "react";
import DisputesCard from "./disputes-card";

const DisputesHeader = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-[25px] tracking-[0.5rem] uppercase font-medium">
          Manage Disputes
        </h1>
        <Button>
          Download Report <Download />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
        <DisputesCard title="Total Disputes" value="$#,###" />
        <DisputesCard title="Open Disputes" value="$#,###" />
        <DisputesCard title="Dispute Escalation Rate (%)" value="$#,###" />
        <DisputesCard title="Avg. Resolution Time" value="$#,###" />
      </div>
    </div>
  );
};

export default DisputesHeader;
