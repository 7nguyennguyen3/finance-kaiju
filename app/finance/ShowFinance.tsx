"use client";
import { Color } from "@/components/type";
import { CATEGORY, Finance } from "@prisma/client";
import { Badge, Card, Flex, Spinner, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const categoryColors: Record<CATEGORY, Color> = {
  FOOD: "sky",
  ENTERTAINMENT: "indigo",
  GIFT: "blue",
  TRANSPORTATION: "gray",
  UTILITIES: "gold",
  HOUSING: "bronze",
  EDUCATION: "brown",
  MISCELLANEOUS: "yellow",
  INCOME: "amber",
  PROFIT: "orange",
};

const ShowFinance = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const {
    data: records,
    error,
    isLoading,
  } = useQuery<Finance[]>({
    queryKey: ["email"],
    queryFn: () =>
      axios
        .put<Finance[]>("api/finance", { credentialsEmail: userEmail })
        .then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 2,
    enabled: !!session,
  });

  if (isLoading)
    return (
      <Flex gap="1">
        Loading... <Spinner size="3" />
      </Flex>
    );

  if (error) return null;

  return (
    <div>
      {records?.map((record) => (
        <Card key={record.id} className="mb-4">
          <Flex gap="2" justify="between">
            <Text>${record.amount}</Text>
            <Badge color={categoryColors[record.category]}>
              {record.category}
            </Badge>
          </Flex>
        </Card>
      ))}
    </div>
  );
};

export default ShowFinance;
