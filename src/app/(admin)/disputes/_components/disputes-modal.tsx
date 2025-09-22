"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { useModalStore } from "@/state/ModalState/useModalStore";
import BookingSnapShot from "./modals/booking-snapshot";
import DisputesDetails from "./modals/disputes-details";

const DisputesModal = () => {
  const { isDisputesModalOpen, setIsDisputesModalOpen } = useModalStore();

  const levels = [
    { label: "Booking Snapshot" },
    { label: "Dispute Details" },
    { label: "Customer" },
    { label: "Lender" },
    { label: "Payment" },
    { label: "Disputes" },
    { label: "Notes" },
    { label: "Timeline" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl p-10">
        <div className="h-[700px] overflow-auto scrollbar-hide">
          <div>
            <Image
              src={"/logo.png"}
              alt="logo.png"
              width={1000}
              height={1000}
              className="w-12 h-12 mx-auto"
            />
          </div>

          <h1 className="text-xl font-medium">Dispute Details: ########</h1>

          <div className="flex items-center justify-between mt-8 border-b border-black/25">
            {levels.map((item, index) => (
              <button
                onClick={() => setIsDisputesModalOpen(item.label)}
                className={`pb-1 px-5 ${
                  isDisputesModalOpen === item.label
                    ? "border-b-2 border-black"
                    : ""
                }`}
                key={index}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div>
            {isDisputesModalOpen === "Booking Snapshot" && <BookingSnapShot />}
            {isDisputesModalOpen === "Dispute Details" && <DisputesDetails />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DisputesModal;
