"use client";
import { GOAL } from "@prisma/client";
import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Separator,
  Switch,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosCheckmark, IoIosClose, IoIosTrash } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateNewGoal from "./CreateNewGoal";
import GoalCategorySwap from "./GoalCategorySwap";
import { MdOutlineFiberNew } from "react-icons/md";

interface Props {
  goalsRecord: GOAL[];
  color: "crimson" | "grass";
}

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

const updateGoal = ({ goal, router, status }: any) => {
  axios.patch("api/goal", {
    id: goal.id,
    status: status,
  });
  notifyGoalupdated("⭐ Goal updated!");
  router.refresh();
};

const ShowMobileGoal = ({ goals, completedGoals, borderColor }: any) => {
  const [current, setCurrent] = useState("current");
  const [advancedView, setAdvancedView] = useState(false);
  const router = useRouter();

  const latestGoal = (goals: GOAL[]) => {
    return goals.reduce((latest, goal) => {
      return new Date(goal.createdAt) > new Date(latest.createdAt)
        ? goal
        : latest;
    }, goals[0]);
  };

  const mapping = ({ goalsRecord, color }: Props) =>
    goalsRecord.map((goal) => (
      <Box
        key={goal.id}
        className={classNames("mx-2 relative w-full p-5 rounded-xl", {
          "border border-blue-400": goal.status === "INCOMPLETE",
          "border border-emerald-200": goal.status === "COMPLETE",
          "bg-slate-950": goal.id === latestGoal(goalsRecord).id,
        })}
      >
        <Flex justify="between">
          <Link href={`/goal/${goal.id}`} className="hover:text-indigo-500">
            <Flex align="center" gap="2">
              <Text className="font-semibold">{goal.title}</Text>
            </Flex>
          </Link>

          <Flex align="center" gap="1">
            {goal.id === latestGoal(goalsRecord).id && (
              <MdOutlineFiberNew className="text-[28px]" />
            )}
            <Badge color={color}>{goal.status}</Badge>
            <IoIosTrash
              onClick={async () => {
                await axios.delete("api/goal", { data: { id: goal.id } });
                notifyGoalupdated("🗑️ Goal deleted!");
                router.refresh();
              }}
              className="text-[20px] hover:scale-150"
            />
          </Flex>
        </Flex>
        <Separator my="2" size="4" />
        <Blockquote className="font-normal p-3">{goal.description}</Blockquote>
        <Separator my="2" size="4" />
        <Flex justify="between" align="center">
          <Text
            size="2"
            color="violet"
            align="center"
            weight="light"
            highContrast
          >
            {new Date(goal.updatedAt).toLocaleDateString()}
          </Text>
          {goal.status === "COMPLETE" ? (
            <IoIosClose
              onClick={() =>
                updateGoal({
                  goal: goal,
                  router: router,
                  status: "INCOMPLETE",
                })
              }
              className="text-[40px] hover:scale-150"
            />
          ) : (
            <IoIosCheckmark
              onClick={() =>
                updateGoal({
                  goal: goal,
                  router: router,
                  status: "COMPLETE",
                })
              }
              className="text-[40px] hover:scale-150"
            />
          )}
        </Flex>
      </Box>
    ));

  return (
    <>
      {/* Toast Notification Effect */}
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
        className="min-h-screen mx-auto"
        maxWidth={{ initial: "300px", xs: "430px", md: "920px" }}
        gap="5"
      >
        {/* Goal Catergoy Swap */}
        <Flex
          justify="between"
          className="w-full"
          maxWidth={{ xs: "430px", md: "920px" }}
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

              <CreateNewGoal />
            </Flex>
          </div>
        </Flex>

        {/* Mapping of Goals */}
        <Flex direction="column" align="center" justify="center">
          {!advancedView && (
            <Grid columns={{ initial: "1", md: "2" }} gap="5">
              {current === "current" &&
                mapping({
                  color: "crimson",
                  goalsRecord: goals,
                })}
              {current === "completed" &&
                mapping({
                  color: "grass",
                  goalsRecord: completedGoals,
                })}
            </Grid>
          )}

          {advancedView && <Heading>Currently Being Worked On</Heading>}
        </Flex>
      </Flex>
    </>
  );
};

export default ShowMobileGoal;
