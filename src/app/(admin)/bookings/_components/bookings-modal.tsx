"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import BookingSummery from "./modals/booking-summery";
import BookingStatus from "./modals/booking-status";
import { useModalStore } from "@/state/ModalState/useModalStore";

const BookingsModal = () => {
  const { isBookingModalOpen, setIsBookingModalOpen } = useModalStore();

  const levels = [
    { label: "Summary" },
    { label: "Status" },
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
        <div>
          <Image
            src={"/logo.png"}
            alt="logo.png"
            width={1000}
            height={1000}
            className="w-12 h-12 mx-auto"
          />
        </div>

        <h1 className="text-xl font-medium">Booking Details: ######</h1>

        <div className="flex items-center justify-between mt-8 border-b border-black/25">
          {levels.map((item, index) => (
            <button
              onClick={() => setIsBookingModalOpen(item.label)}
              className={`pb-1 px-5 ${
                isBookingModalOpen === item.label
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
          {isBookingModalOpen === "Summary" && <BookingSummery />}
          {isBookingModalOpen === "Status" && <BookingStatus />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingsModal;
