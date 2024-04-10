"use client";
import { CATEGORY, Finance } from "@prisma/client";
import {
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useSession } from "next-auth/react";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const categoryColors: Record<CATEGORY, string> = {
  FOOD: "rgb(135, 206, 235)", // sky
  ENTERTAINMENT: "rgb(75, 0, 130)", // indigo
  GIFT: "rgb(0, 0, 255)", // blue
  TRANSPORTATION: "rgb(128, 128, 128)", // gray
  UTILITIES: "rgb(255, 215, 0)", // gold
  HOUSING: "rgb(205, 127, 50)", // bronze
  EDUCATION: "rgb(165, 42, 42)", // brown
  MISCELLANEOUS: "rgb(255, 255, 0)", // yellow
  INCOME: "rgb(255, 191, 0)", // amber
  PROFIT: "rgb(255, 165, 0)", // orange
};

const dataSpecs = [
  { category: "Food", color: "rgb(135, 206, 235)" },
  { category: "Entertainment", color: "rgb(75, 0, 130)" },
  { category: "Gift", color: "rgb(0, 0, 255)" },
  { category: "Transportation", color: "rgb(128, 128, 128)" },
  { category: "Utilities", color: "rgb(255, 215, 0)" },
  { category: "Housing", color: "rgb(205, 127, 50)" },
  { category: "Education", color: "rgb(165, 42, 42)" },
  { category: "Miscellaneous", color: "rgb(255, 255, 0)" },
  { category: "Income", color: "rgb(255, 191, 0)" },
  { category: "Profit", color: "rgb(255, 165, 0)" },
];

const FinanceDoughnutChart = () => {
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

  const food = records
    ?.filter((record) => record.category === "FOOD")
    .reduce((total, record) => total + record.amount, 0);

  const entertainment = records
    ?.filter((record) => record.category === "ENTERTAINMENT")
    .reduce((total, record) => total + record.amount, 0);

  const gift = records
    ?.filter((record) => record.category === "GIFT")
    .reduce((total, record) => total + record.amount, 0);

  const transportation = records
    ?.filter((record) => record.category === "TRANSPORTATION")
    .reduce((total, record) => total + record.amount, 0);

  return (
    <Flex
      align="center"
      justify="center"
      width={{ initial: "100%", md: "90%", xl: "60%" }}
      gap="5"
      className="p-5 m-auto"
      direction={{ initial: "column", md: "row" }}
      overflow="clip"
    >
      <Flex
        width="100%"
        justify="center"
        align="center"
        maxHeight="400px"
        direction="column"
        gap="2"
      >
        <Heading>Expense Chart</Heading>
        <Doughnut
          data={{
            datasets: [
              {
                label: "Total Amount",

                data: [
                  food,
                  entertainment,
                  gift,
                  transportation,
                  0,
                  0,
                  0,
                  0,
                  0,
                  0,
                ],
                backgroundColor: dataSpecs.map((color) => color.color),
                borderColor: "#fEfEfE",
                hoverBorderWidth: 5,
              },
            ],
          }}
        />
      </Flex>
      <Box>
        <Box display={{ initial: "none", md: "inline" }}>
          {dataSpecs.map((data) => (
            <Flex width="200px" key="data" align="center" justify="between">
              <Text>{data.category}</Text>
              <div
                className={`w-10 h-5 rounded-sm mb-2`}
                style={{ backgroundColor: data.color }}
              />
            </Flex>
          ))}
        </Box>
        <Box display={{ initial: "inline", md: "none" }} width="100%">
          <Grid columns="2" gapX="5" className="mt-5">
            {dataSpecs.map((data) => (
              <Flex
                width="100%"
                key="data"
                align="center"
                justify="between"
                gap="3"
              >
                <Text size={{ initial: "2", sm: "3" }}>{data.category}</Text>
                <Box
                  width="30px"
                  height="20px"
                  className="rounded-sm mb-2"
                  style={{ backgroundColor: data.color }}
                />
              </Flex>
            ))}
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
};

export default FinanceDoughnutChart;
