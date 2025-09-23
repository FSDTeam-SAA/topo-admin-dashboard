import { create } from "zustand";

interface IFilterBooking {
  search: string;
  setSearch: (value: string) => void;
}

const initialStates = {
  search: "",
};

export const useFilterBooking = create<IFilterBooking>((set) => ({
  ...initialStates,
  setSearch: (value: string) => set({ search: value }),
}));
