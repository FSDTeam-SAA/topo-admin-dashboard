import React from "react";

interface MrrData {
  totalMRR: string;
  totalNewSignUps: string;
  totalCancelledSubscribers: string;
}

const MrrStates = ({ mrrData }: { mrrData: MrrData }) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] h-[150px] p-5  rounded-lg hover:bg-black hover:text-white delay-100 transition-all">
        <button className="underline">Total MRR</button>
        <p className="font-medium text-2xl mt-5 font-serif">
          $ {mrrData?.totalMRR}
        </p>
      </div>

      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] h-[150px] p-5  rounded-lg hover:bg-black hover:text-white delay-100 transition-all">
        <button className="underline">New Sign-ups</button>
        <p className="font-medium text-2xl mt-5 font-serif">
          $ {mrrData?.totalNewSignUps}
        </p>
      </div>

      <div className="bg-white shadow-[0px_4px_10px_0px_#0000001A] h-[150px] p-5  rounded-lg hover:bg-black hover:text-white delay-100 transition-all">
        <button className="underline">Churned Users</button>
        <p className="font-medium text-2xl mt-5 font-serif">
          $ {mrrData?.totalCancelledSubscribers}
        </p>
      </div>
    </div>
  );
};

export default MrrStates;
