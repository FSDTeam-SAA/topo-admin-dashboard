import { create } from "zustand";

interface IBookingStore {
  isBookingModalOpen: string;
  setIsBookingModalOpen: (value: string) => void;
}

const initialStates = {
  isBookingModalOpen: "Summary",
};

export const useModalStore = create<IBookingStore>((set) => ({
  ...initialStates,
  setIsBookingModalOpen: (value: string) => set({ isBookingModalOpen: value }),
}));
