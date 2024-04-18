"use client";
import Loading from "@/app/loading";
import { Flex, Grid, Heading, Switch, Text } from "@radix-ui/themes";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGoalRecords } from "../hook";
import CreateNewGoal from "./CreateNewGoal";
import GoalCard from "./GoalCard";
import GoalCategorySwap from "./GoalCategorySwap";
import { notFound } from "next/navigation";

const ShowGoal = () => {
  const [current, setCurrent] = useState("current");
  const [advancedView, setAdvancedView] = useState(false);

  const { data: goals, isLoading, isError } = useGoalRecords();

  if (isLoading) return <Loading />;

  if (isError) notFound();

  const notifyGoalupdated = (message: string) =>
    toast(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

  const completedGoals = goals
    ?.filter((goal) => goal.status === "COMPLETE")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  const incompleteGoals = goals
    ?.filter((goal) => goal.status == "INCOMPLETE")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  const goalsToDisplay =
    current === "current" ? incompleteGoals : completedGoals;

  return (
    <>
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
        direction="column"
        className="min-h-screen mx-auto border"
        maxWidth={{ initial: "400px", md: "920px" }}
        width={{ initial: "90%", xs: "100%" }}
        gap="5"
      >
        {/* Top Section Category Swap & Advanced View & Create Goal */}
        <Flex
          justify="between"
          className="w-full mx-auto"
          maxWidth={{ xs: "420px", md: "920px" }}
          direction={{ initial: "column", md: "row" }}
          gap="3"
        >
          <GoalCategorySwap current={current} setCurrent={setCurrent} />
          <div>
            <Flex gap="3" justify="between">
              <Flex align="center" gap="2">
                <Text>Advanced View</Text>
                <Switch
                  color="blue"
                  onClick={() => {
                    setAdvancedView(!advancedView);
                  }}
                />
              </Flex>

              <CreateNewGoal goalToast={notifyGoalupdated} />
            </Flex>
          </div>
        </Flex>
        {/* Mapping of Goals */}
        <Flex
          direction="column"
          align="center"
          justify="center"
          className="w-full"
        >
          {!advancedView && (
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
              {goalsToDisplay?.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  color={goal.status === "COMPLETE" ? "grass" : "crimson"}
                  goalToast={notifyGoalupdated}
                />
              ))}
            </Grid>
          )}
          {advancedView && <Heading>Currently Being Worked On</Heading>}
        </Flex>
      </Flex>
    </>
  );
};

export default ShowGoal;
