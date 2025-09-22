import React from "react";
import DisputesHeader from "./_components/DisputesHeader";
import SearchDisputes from "./_components/search-disputes";
import DisputesTable from "./_components/disputes-table";

const page = () => {
  return (
    <div>
      <DisputesHeader />
      <SearchDisputes />
      <DisputesTable />
    </div>
  );
};

export default page;
