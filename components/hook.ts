import { Finance } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFinanceRecords = (userEmail: string) => {
  return useQuery<Finance[]>({
    queryKey: ["email"],
    queryFn: () =>
      axios
        .put<Finance[]>("api/finance", { credentialsEmail: userEmail })
        .then((res) => res.data),
    retry: 2,
    staleTime: 1000 * 60 * 10,
    enabled: !!userEmail,
  });
};
