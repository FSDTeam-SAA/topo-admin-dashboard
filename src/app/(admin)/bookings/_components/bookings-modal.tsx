"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import BookingSummery from "./modals/booking-summery";
import BookingStatus from "./modals/booking-status";
import { useModalStore } from "@/state/ModalState/useModalStore";
import BookingCustomer from "./modals/booking-customer";
import BookingLender from "./modals/booking-lender";
import BookingPayment from "./modals/booking-payment";
import BookingDisputes from "./modals/booking-disputes";
import BookingNotes from "./modals/booking-notes";
import BookingTimeline from "./modals/booking-timeline";
import { useQuery } from "@tanstack/react-query";

interface Props {
  id: string;
  token: string;
}

const BookingsModal = ({ id, token }: Props) => {
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

  const { data: bookingDetails = {} } = useQuery({
    queryKey: ["booking-details"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/customer/bookings/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();

      return data.data;
    },
  });


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-5xl p-10">
        <div className="overflow-auto scrollbar-hide">
          <div>
            <Image
              src={"/logo.png"}
              alt="logo.png"
              width={1000}
              height={1000}
              className="w-12 h-12 mx-auto"
            />
          </div>

          <h1 className="text-xl font-medium">Booking Details</h1>

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
            {isBookingModalOpen === "Summary" && <BookingSummery bookingDetails={bookingDetails} />}
            {isBookingModalOpen === "Status" && <BookingStatus bookingDetails={bookingDetails} />}
            {isBookingModalOpen === "Customer" && <BookingCustomer bookingDetails={bookingDetails} />}
            {isBookingModalOpen === "Lender" && <BookingLender bookingDetails={bookingDetails} />}
            {isBookingModalOpen === "Payment" && <BookingPayment />}
            {isBookingModalOpen === "Disputes" && <BookingDisputes />}
            {isBookingModalOpen === "Notes" && <BookingNotes />}
            {isBookingModalOpen === "Timeline" && <BookingTimeline />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingsModal;
