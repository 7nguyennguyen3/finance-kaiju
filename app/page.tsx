"use client";
import { months } from "@/components/type";
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Loading from "./loading";

import { IoChatboxOutline } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import DailyQuote from "./DailyQuote";
import FinanceSummary from "./FinanceSummary";
import LatestGoal, { dummyGoals } from "./LatestGoal";

import GoalCard from "@/components/goal/GoalCard";
import { useState } from "react";
import FinanceDoughnutChart from "./finance/FinanceDoughnutChart";

const currentMonthIndex = new Date().getMonth();
const selectedMonth = months[currentMonthIndex];

export default function Home() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [slideShow, setSlideShow] = useState(1);

  status === "loading" && <Loading />;

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
      ) : (
        <Flex className="p-5" direction="column" gap="5">
          <Flex className="border max-w-[400px] p-5" direction="column" gap="5">
            <text className="text-8xl font-bold">The Finance Kaiju</text>
            <Text size="5">
              Set goals, track financial transactions, and explore a variety of
              topics with our chatbot!
            </Text>
            <Link href="/sign-in">
              <button className="border-2 border-emerald-800 bg-emerald-950 p-3 text-2xl rounded-lg ">
                Get Started for Free!
              </button>
            </Link>
          </Flex>
          <Grid gap="3" columns="5fr 90fr 5fr" className="border m-auto p-5">
            <button
              onClick={() => setSlideShow(slideShow - 1)}
              className=" m-auto"
            >
              <FaChevronCircleLeft size={30} />
            </button>
            <Flex
              className="w-full max-h-[600px] m-auto overflow-y-scroll"
              direction="column"
              gap="3"
            >
              <Heading>
                {slideShow === 1
                  ? "Goal App"
                  : slideShow === 2
                    ? "Finance App"
                    : "Chatbot"}
              </Heading>
              {slideShow === 1 &&
                dummyGoals.map((goal) => (
                  <Flex key={goal.id} className="mb-5">
                    <GoalCard
                      goal={goal}
                      color={goal.status === "COMPLETE" ? "grass" : "crimson"}
                    />
                  </Flex>
                ))}
              {slideShow === 2 && <FinanceDoughnutChart />}
            </Flex>
            <button
              onClick={() => setSlideShow(slideShow + 1)}
              className=" m-auto"
            >
              <FaChevronCircleRight size={30} />
            </button>
          </Grid>
        </Flex>
      )}
    </Container>
  );
}

export const dynamic = "force-dynamic";
