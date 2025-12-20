"use client";
import React from "react";
import MrrStates from "./mrr-states";
import { useQuery } from "@tanstack/react-query";

const MRR = ({ token }: { token: string }) => {
  const { data: mrrData } = useQuery({
    queryKey: ["mrr"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/admin/overview/dashboard/finance/subscriptionAnalytics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <MrrStates mrrData={mrrData} />
      </div>
    </div>
  );
};

export default MRR;
