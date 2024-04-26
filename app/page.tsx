"use client";
import GoalCard from "@/components/goal/GoalCard";
import { useFinanceRecords, useGoalRecords } from "@/components/hook";
import { months } from "@/components/type";
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Loading from "./loading";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import GoalCategorySwap from "@/components/goal/GoalCategorySwap";
import { IoChatboxOutline, IoClose } from "react-icons/io5";

import { FaArrowRightToBracket } from "react-icons/fa6";
import Link from "next/link";

const currentMonthIndex = new Date().getMonth();
const selectedMonth = months[currentMonthIndex];

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const { data: records, error, isLoading } = useFinanceRecords(userEmail!);
  const { data: goals } = useGoalRecords(userEmail!);
  const [current, setCurrent] = useState("current");
  const [miniChatBot, openMiniChatBot] = useState(false);

  isLoading || (status === "loading" && <Loading />);

  if (error) return null;

  const notifyGoalupdated = (message: string) =>
    toast(`${message}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const deposit =
    records
      ?.filter(
        (record) =>
          (record.category === "INCOME" || record.category === "PROFIT") &&
          new Date(record.date).toLocaleString("default", {
            month: "long",
          }) === selectedMonth
      )
      .reduce((total, record) => total + record.amount, 0)
      .toFixed(2) || "0.00";

  const expense =
    records
      ?.filter(
        (record) =>
          record.category !== "INCOME" &&
          record.category !== "PROFIT" &&
          new Date(record.date).toLocaleString("default", {
            month: "long",
          }) === selectedMonth
      )
      .reduce((total, record) => total + record.amount, 0)
      .toFixed(2) || "0.00";

  const balance = (parseFloat(deposit) - parseFloat(expense)).toFixed(2);

  const highExpenseRecord = records
    ?.filter(
      (record) => record.category !== "INCOME" && record.category !== "PROFIT"
    )
    .reduce(
      (max, record) => (record.amount > max.amount ? record : max),
      records[0]
    );

  return (
    <Container>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="3"
        className="h-screen border relative"
      >
        <Flex className="absolute right-5 top-5" align="center" gap="2">
          <Heading size="5">Access Mini-Chatbot Here!</Heading>
          <button onClick={() => openMiniChatBot(!miniChatBot)}>
            <IoChatboxOutline size={50} />
          </button>
        </Flex>
        {miniChatBot && (
          <Flex
            className="absolute top-[70px] right-5
        w-[350px] h-[500px] bg-black z-10 rounded-md"
          >
            <Link href="/chatbot" className="absolute left-5 top-5">
              <Text>Visit Chatbot!</Text>
            </Link>
            <button
              className="absolute top-5 right-5"
              onClick={() => openMiniChatBot(false)}
            >
              <IoClose size={25} />
            </button>
          </Flex>
        )}
        <Grid
          columns={{ initial: "1", sm: "35fr 65fr" }}
          className="w-[90%]"
          align="center"
          justify="center"
        >
          <Box className="border" height={{ initial: "100%", sm: "400px" }}>
            <Flex gap="5" direction="column" className="p-5" align="center">
              <Heading color="blue">{selectedMonth} Summary</Heading>
              <Heading color={balance < "0" ? "red" : "gray"}>
                Balance: ${balance}
              </Heading>
              <Text color="crimson">Expense: ${expense}</Text>
              <Text color="crimson">
                Highest Expense: ${highExpenseRecord?.amount}
              </Text>
              <button className="p-5 border border-blue-400 rounded-md">
                Go to Finance
              </button>
            </Flex>
          </Box>
          <Box
            className="border rounded-md overflow-y-scroll"
            height={{ initial: "100%", sm: "500px" }}
          >
            <Flex gap="5" direction="column" className="p-5">
              <Flex
                justify="between"
                align="center"
                gap="3"
                direction={{ initial: "column", sm: "row" }}
              >
                <Link
                  href="/goal"
                  className="hover:scale-110 hover:text-purple-400"
                >
                  <Flex gap="2" align="center">
                    <Heading>Latest Goals </Heading>
                    <FaArrowRightToBracket size={30} />
                  </Flex>
                </Link>

                <GoalCategorySwap current={current} setCurrent={setCurrent} />
              </Flex>
              {goals
                ?.filter(
                  (goal) =>
                    goal.status ===
                    (current === "current" ? "INCOMPLETE" : "COMPLETE")
                )
                .slice(0, 4)
                .map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    color={goal.status === "COMPLETE" ? "grass" : "crimson"}
                    goalToast={notifyGoalupdated}
                  />
                ))}
            </Flex>
          </Box>
        </Grid>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-dynamic";
