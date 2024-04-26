import { Finance } from "@prisma/client";
import { create } from "zustand";

type State = {
  finances: Finance[];
  addFinance: (finance: Finance) => void;
  balance: number;
  deposit: number;
  expenseNum: number;
};

export const useStore = create((set) => ({
  finances: [],
  balance: 0,
  deposit: 0,
  expenseNum: 0,
}));
