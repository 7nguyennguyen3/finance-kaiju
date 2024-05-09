"use client";
import { months } from "@/components/type";
import { Container, Flex, Grid, Heading } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Loading from "./loading";

import { IoChatboxOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import DailyQuote from "./DailyQuote";
import FinanceSummary from "./FinanceSummary";
import LatestGoal from "./LatestGoal";

import UnauthenticatedUserDisplay from "./UnauthenticatedUserDisplay";

const currentMonthIndex = new Date().getMonth();
const selectedMonth = months[currentMonthIndex];

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

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
      {status === "authenticated" ? (
        <Flex
          align="center"
          justify="center"
          direction="column"
          gap="3"
          className=" relative"
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
            <FinanceSummary
              selectedMonth={selectedMonth}
              userEmail={userEmail}
            />
            <LatestGoal
              notifyGoalupdated={notifyGoalupdated}
              userEmail={userEmail}
            />
          </Grid>
        </Flex>
      ) : status === "loading" ? (
        <Loading />
      ) : (
        <UnauthenticatedUserDisplay />
      )}
    </Container>
  );
}

export const dynamic = "force-dynamic";
