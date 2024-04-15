import { Finance, GOAL } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface UpdateGoalVars {
  id: number;
  status: string;
}

export const useFinanceRecords = (userEmail: string) => {
  return useQuery<Finance[]>({
    queryKey: ["email"],
    queryFn: () =>
      axios
        .put<Finance[]>("api/finance", { credentialsEmail: userEmail })
        .then((res) => res.data),
    retry: 2,
    staleTime: 1000 * 60 * 30, // 30 minutes
    enabled: !!userEmail,
  });
};

export const useGoalRecords = () => {
  return useQuery<GOAL[]>({
    queryKey: ["goal"],
    queryFn: () => axios.get("api/goal").then((res) => res.data),
    retry: 3,
    staleTime: 1000 * 60 * 30, // 30 minutes,
  });
};
