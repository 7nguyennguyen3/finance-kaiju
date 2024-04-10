"use client";
import { Color } from "@/components/type";
import { CATEGORY, Finance } from "@prisma/client";
import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Separator,
  Spinner,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
  const [init, setInit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let n1 = init + 8;

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

  const pageCount = Math.ceil(records?.length! / 8);

  if (isLoading)
    return (
      <Flex gap="1">
        Loading... <Spinner size="3" />
      </Flex>
    );

  if (error) return null;

  return (
    <Box maxHeight="500px">
      <Grid columns="1fr 8fr 1fr" align="center" className="py-5" width="auto">
        <button
          onClick={() => {
            setCurrentPage(currentPage - 1);
            setInit(init - 8);
          }}
          className=" hover:scale-110 m-auto"
          disabled={init < 8}
        >
          <FaChevronLeft size="40" />
        </button>
        <Flex direction="column" gap="2">
          <Flex justify="between">
            <Text>Transaction Summary</Text>
            <Text>
              {currentPage}/{pageCount}
            </Text>
          </Flex>

          {records?.slice(init, n1).map((record) => (
            <Card key="record">
              <Flex justify="between">
                <Text>${record.amount}</Text>
                <Badge color={categoryColors[record.category]}>
                  {record.category}
                </Badge>
              </Flex>
            </Card>
          ))}
        </Flex>
        <button
          disabled={currentPage === pageCount}
          onClick={() => {
            setInit(init + 8);
            setCurrentPage(currentPage + 1);
          }}
          className="m-auto hover:scale-110"
        >
          <FaChevronRight size="40" />
        </button>
      </Grid>
    </Box>
  );
};

export default ShowFinance;
