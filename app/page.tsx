"use client";
import GoalCard from "@/components/goal/GoalCard";
import { useFinanceRecords, useGoalRecords } from "@/components/hook";
import { months } from "@/components/type";
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Loading from "./loading";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import GoalCategorySwap from "@/components/goal/GoalCategorySwap";
import { IoChatboxOutline, IoClose, IoSend } from "react-icons/io5";

import { FaArrowRightToBracket } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { FaRecycle } from "react-icons/fa";
import DailyQuote from "./DailyQuote";
import LatestGoal from "./LatestGoal";

const currentMonthIndex = new Date().getMonth();
const selectedMonth = months[currentMonthIndex];

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const { data: records, error, isLoading } = useFinanceRecords(userEmail!);

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
        className="h-screen relative"
      >
        <Flex align="center" gap="2">
          <Heading size="5">Talk to Chatbot?</Heading>
          <Link href="/chatbot">
            <button>
              <IoChatboxOutline size={40} className="text-blue-400" />
            </button>
          </Link>
        </Flex>
        <DailyQuote />
        <Grid
          columns={{ initial: "1", sm: "35fr 65fr" }}
          gap="5"
          className="w-[90%]"
          align="center"
        >
          <Flex
            justify="center"
            align="center"
            className="border rounded-md border-gray-400"
            height={{ initial: "300px", xs: "400px", sm: "600px" }}
          >
            <Flex gap="5" direction="column" className="p-5" align="center">
              <Heading color="blue">{selectedMonth} Summary</Heading>
              <Heading color={balance < "0" ? "red" : "gray"}>
                Balance: ${balance}
              </Heading>
              <Text color="grass">Deposit: ${deposit}</Text>
              <Text color="crimson">Expense: ${expense}</Text>
              <Text color="crimson">
                Highest Expense: $
                {!highExpenseRecord ? "0.00" : highExpenseRecord?.amount}
              </Text>
              <button className="p-5 border border-blue-400 rounded-md">
                Go to Finance
              </button>
            </Flex>
          </Flex>
          <LatestGoal
            notifyGoalupdated={notifyGoalupdated}
            userEmail={userEmail}
          />
        </Grid>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-dynamic";
