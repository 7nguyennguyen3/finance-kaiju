"use client";
import { useFinanceRecords } from "@/components/hook";
import { CATEGORY } from "@prisma/client";
import { Box, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { useSession } from "next-auth/react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const chartDataSpecs: { category: CATEGORY; color: string }[] = [
  { category: "FOOD", color: "rgb(135, 206, 235)" },
  { category: "ENTERTAINMENT", color: "rgb(75, 0, 130)" },
  { category: "GIFT", color: "rgb(0, 0, 255)" },
  { category: "TRANSPORTATION", color: "rgb(128, 128, 128)" },
  { category: "UTILITIES", color: "rgb(255, 215, 0)" },
  { category: "HOUSING", color: "rgb(205, 127, 50)" },
  { category: "EDUCATION", color: "rgb(165, 42, 42)" },
  { category: "MISCELLANEOUS", color: "rgb(255, 255, 0)" },
];

const FinanceDoughnutChart = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email;
  const { data: records } = useFinanceRecords(userEmail!);

  if (!userEmail) return null;

  const chartData = chartDataSpecs.map((spec) => {
    return records
      ?.filter((record) => record.category === spec.category)
      .reduce((total, record) => total + record.amount, 0);
  });

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
        <Heading>{userEmail === undefined ? "" : "Expense Chart"}</Heading>
        <Doughnut
          data={{
            datasets: [
              {
                label: "Total Amount",
                data:
                  (records && records.length === 0) || userEmail === undefined
                    ? [5, 5, 5]
                    : chartData,
                backgroundColor: chartDataSpecs.map((color) => color.color),
                borderColor: "#fEfEfE",
                hoverBorderWidth: 5,
              },
            ],
          }}
        />
      </Flex>
      <Box>
        <Box display={{ initial: "none", md: "inline" }}>
          {chartDataSpecs.map((data) => (
            <Flex
              width="200px"
              key={data.category}
              align="center"
              justify="between"
            >
              <Text>
                {/* Capitalize Only First Letter */}
                {data.category.charAt(0) + data.category.toLowerCase().slice(1)}
              </Text>
              <div
                className={`w-10 h-5 rounded-sm mb-2`}
                style={{ backgroundColor: data.color }}
              />
            </Flex>
          ))}
        </Box>
        <Box display={{ initial: "inline", md: "none" }} width="100%">
          <Grid columns="2" gapX="5" className="mt-5">
            {chartDataSpecs.map((data) => (
              <Flex
                width="100%"
                key={data.category}
                align="center"
                justify="between"
                gap="3"
              >
                <Text size={{ initial: "2", sm: "3" }}>
                  {/* Capitalize Only First Letter */}
                  {data.category.charAt(0) +
                    data.category.toLowerCase().slice(1)}
                </Text>
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
