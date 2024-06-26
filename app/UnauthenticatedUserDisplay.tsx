import GoalCard from "@/components/goal/GoalCard";
import { dummyMessages, homepageDummyGoals } from "@/components/type";
import { Avatar, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowDown,
  FaChevronCircleLeft,
  FaChevronCircleRight,
} from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
import ReactMarkdown from "react-markdown";

import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

const UnauthenticatedUserDisplay = () => {
  const [slideShow, setSlideShow] = useState(1);

  return (
    <Flex className="p-3" direction="column" gap="5">
      <Flex
        className="border-pop-out rounded-lg max-w-[400px] p-5 "
        direction="column"
        gap="5"
      >
        <text className="text-7xl font-bold">The Finance Kaiju</text>
        <Text size="5">
          Set goals, track financial transactions, and explore a variety of
          topics with our chatbot!
        </Text>
        <Link href="/sign-in">
          <button className="border-2 border-emerald-800 bg-emerald-950 p-3 text-2xl rounded-lg ">
            Get Started
          </button>
        </Link>
      </Flex>
      <Flex align="center" gap="3">
        <Heading>Preview of our Features </Heading>
        <FaArrowDown size={25} className="text-blue-400" />
      </Flex>
      <Flex
        gap="3"
        className="border rounded-lg w-full overflow-y-auto p-5"
        direction="column"
      >
        <Flex className="w-full h-[700px] m-auto" direction="column" gap="3">
          <Heading color="indigo">
            {slideShow === 1
              ? "Goal App"
              : slideShow === 2
                ? "Finance App"
                : "Chatbot"}
          </Heading>
          {slideShow === 1 && (
            <Grid columns={{ initial: "1", sm: "2" }} gap="5" className="mr-4">
              {homepageDummyGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  color={goal.status === "COMPLETE" ? "grass" : "crimson"}
                />
              ))}
            </Grid>
          )}
          {slideShow === 2 && (
            <Flex
              justify="center"
              align="center"
              className="w-full h-full m-auto"
              direction="column"
              gap="3"
            >
              <Heading>Expense Chart</Heading>
              <Doughnut
                className="mx-auto"
                data={{
                  datasets: [
                    {
                      label: "Total Amount",
                      data: [100, 100, 100],
                      backgroundColor: [
                        "rgb(135, 206, 235)",
                        "rgb(75, 0, 130)",
                        "rgb(0, 0, 255)",
                      ],
                      borderColor: "#fEfEfE",
                      hoverBorderWidth: 5,
                    },
                  ],
                }}
              />
              <Grid columns="2" gap="2" align="center" mt="3">
                <Text size="4">Food</Text>
                <div
                  className="w-[40px] h-[20px] rounded-md ml-auto"
                  style={{ background: "rgb(135, 206, 235)" }}
                />{" "}
                <Text size="4">Entertainment</Text>
                <div
                  className="w-[40px] h-[20px] rounded-md ml-auto"
                  style={{ background: "rgb(75, 0, 130)" }}
                />{" "}
                <Text size="4">Gift</Text>
                <div
                  className="w-[40px] h-[20px] rounded-md ml-auto"
                  style={{ background: "rgb(0, 0, 255)" }}
                />
              </Grid>
            </Flex>
          )}

          {slideShow === 3 && (
            <Flex className="w-full p-3" direction="column">
              {dummyMessages.map((message, index) => {
                const isBotMessage = index % 2 !== 0;
                const className = isBotMessage
                  ? "rounded-[20px] p-4 max-w-[90%] sm:max-w-[80%] my-2 text-[13px] relative self-end bg-blue-600 z-[-1]"
                  : "rounded-[20px] p-4 max-w-[90%] sm:max-w-[80%] my-2 text-[13px] relative self-start bg-white text-black z-[-1]";

                return (
                  <text className={className} key={index}>
                    <ReactMarkdown>{message}</ReactMarkdown>
                    {isBotMessage ? (
                      <Avatar
                        color="grass"
                        src={undefined}
                        fallback="?"
                        radius="full"
                        className="absolute bottom-[-12px] right-[-12px]"
                        size="2"
                      />
                    ) : (
                      <FcAssistant className="absolute bottom-[-10px] left-[-10px] text-[30px]" />
                    )}
                  </text>
                );
              })}
            </Flex>
          )}
        </Flex>
        <Flex align="center" justify="center" gap="3">
          <button
            onClick={() => setSlideShow(slideShow - 1)}
            className={classNames({
              "opacity-10 cursor-not-allowed": slideShow === 1,
            })}
            disabled={slideShow === 1}
          >
            <FaChevronCircleLeft size={30} />
          </button>
          <button
            disabled={slideShow === 3}
            onClick={() => setSlideShow(slideShow + 1)}
            className={classNames({
              "opacity-10 cursor-not-allowed": slideShow === 3,
            })}
          >
            <FaChevronCircleRight size={30} />
          </button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UnauthenticatedUserDisplay;
