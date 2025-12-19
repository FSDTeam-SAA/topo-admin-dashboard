import React from "react";
import FinanceCard from "./finance-card";

const FinanceHeader = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[25px] tracking-[0.5rem] uppercase font-medium">
          Manage Finance
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FinanceCard title="Total Disputes" value={"0"} />
        <FinanceCard title="Pending Disputes" value={"0"} />
        <FinanceCard title="Resolved Disputes" value={"0"} />
        <FinanceCard title="Resolution Rate" value={"0"} />
        <FinanceCard title="Avg. Resolution Time" value={"0"} />
        <FinanceCard title="Avg. Resolution Time" value={"0"} />
      </div>
    </div>
  );
};

export default FinanceHeader;
