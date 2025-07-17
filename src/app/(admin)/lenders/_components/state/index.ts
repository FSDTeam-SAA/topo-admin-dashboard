// stores/lenderSearchStore.ts
import moment from "moment";
import { create } from "zustand";

type DateRange = {
  from: Date | undefined | string;
  to: Date | undefined | string;
};

type LenderSearchState = {
  value: string;
  status: string;
  page: number;
  setPage: (page: number) => void;
  dateRange: DateRange;
  setValue: (value: string) => void;
  setStatus: (status: string) => void;
  setDateRange: (range: DateRange) => void;
};

export const useLenderSearchStore = create<LenderSearchState>((set) => ({
  value: "",
  status: "",
  page: 1,
  setPage: (page) => set({ page }),
  dateRange: {
    from: moment().subtract(30, "days").format("YYYY-MM-DD"),
    to: moment().format("YYYY-MM-DD"),
  },
  setValue: (value) => set({ value }),
  setStatus: (status) => set({ status }),
  setDateRange: (dateRange) => set({ dateRange }),
}));
