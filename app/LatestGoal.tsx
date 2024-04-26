import GoalCard from "@/components/goal/GoalCard";
import GoalCategorySwap from "@/components/goal/GoalCategorySwap";
import { useGoalRecords } from "@/components/hook";
import { Box, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface Props {
  userEmail: string | null | undefined;
  notifyGoalupdated: any;
}

const dummyGoals = [
  {
    id: 1,
    title: "Dummy Goal",
    description:
      "You currently don't have any goal, please add a goal to remove dummy goals",
    status: "INCOMPLETE",
  },
  {
    id: 2,
    title: "Dummy Goal",
    description:
      "You currently don't have any goal, please add a goal to remove dummy goals",
    status: "INCOMPLETE",
  },
  {
    id: 3,
    title: "Dummy Goal",
    description:
      "You currently don't have any goal, please add a goal to remove dummy goals",
    status: "INCOMPLETE",
  },
];

const LatestGoal = ({ userEmail, notifyGoalupdated }: Props) => {
  const { data: goals } = useGoalRecords(userEmail!);
  const [current, setCurrent] = useState("current");

  return (
    <Box
      className="border border-gray-400 rounded-md overflow-y-scroll"
      height={{ initial: "300px", xs: "400px", sm: "600px" }}
    >
      <Flex gap="5" direction="column" className="p-5">
        <Flex
          justify="between"
          align="center"
          gap="3"
          direction={{ initial: "column", sm: "row" }}
        >
          <Link href="/goal" className="hover:scale-110">
            <Flex gap="2" align="center">
              <Heading>Latest Goals </Heading>
              <FaArrowRightToBracket
                size={30}
                className="hover:text-blue-600
                text-blue-400"
              />
            </Flex>
          </Link>

          <GoalCategorySwap current={current} setCurrent={setCurrent} />
        </Flex>
        {goals &&
          goals!.length <= 0 &&
          dummyGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              color={goal.status === "COMPLETE" ? "grass" : "crimson"}
            />
          ))}
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
  );
};

export default LatestGoal;
