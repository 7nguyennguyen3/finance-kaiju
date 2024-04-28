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
import FinanceDoughnutChart from "./finance/FinanceDoughnutChart";

const UnauthenticatedUserDisplay = () => {
  const [slideShow, setSlideShow] = useState(1);

  return (
    <Flex className="p-5" direction="column" gap="5">
      <Flex className="border max-w-[400px] p-5" direction="column" gap="5">
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
      <Grid gap="3" columns="5fr 90fr 5fr" className="border w-full p-5">
        <button
          onClick={() => setSlideShow(slideShow - 1)}
          className={classNames("m-auto", {
            "opacity-10 cursor-not-allowed": slideShow === 1,
          })}
          disabled={slideShow === 1}
        >
          <FaChevronCircleLeft size={30} />
        </button>
        <Flex
          className="w-full h-[600px] m-auto overflow-y-scroll"
          direction="column"
          gap="3"
        >
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
          {slideShow === 2 && <FinanceDoughnutChart />}
          {slideShow === 3 && (
            <Flex className="w-full p-5" direction="column">
              {dummyMessages.map((message, index) => {
                const isBotMessage = index % 2 !== 0;
                const className = isBotMessage
                  ? "chat-message self-end bg-blue-600 z-[-1]"
                  : "chat-message self-start bg-white text-black z-[-1]";

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
        <button
          disabled={slideShow === 3}
          onClick={() => setSlideShow(slideShow + 1)}
          className={classNames("m-auto", {
            "opacity-10 cursor-not-allowed": slideShow === 3,
          })}
        >
          <FaChevronCircleRight size={30} />
        </button>
      </Grid>
    </Flex>
  );
};

export default UnauthenticatedUserDisplay;
