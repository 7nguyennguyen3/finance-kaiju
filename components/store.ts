import { Finance } from "@prisma/client";
import create from "zustand";

// Define your store
export const useStore = create((set) => ({
  updatedRecord: [],
  setUpdatedRecord: (records: Finance) => set({ updatedRecord: records }),
}));
