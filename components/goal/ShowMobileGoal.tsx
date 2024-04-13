"use client";
import { GOAL } from "@prisma/client";
import {
  Badge,
  Blockquote,
  Card,
  Flex,
  Grid,
  Link,
  SegmentedControl,
  Separator,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosCheckmark, IoIosClose, IoIosTrash } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  goalsRecord: GOAL[];
  color: "crimson" | "grass";
}

const notifyGoalupdated = (message: string) =>
  toast(`⭐ ${message}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const ShowMobileGoal = ({ goals, completedGoals, borderColor }: any) => {
  const [current, setCurrent] = useState("current");
  const router = useRouter();

  const mapping = ({ goalsRecord, color }: Props) =>
    goalsRecord.map((goal) => (
      <Card
        key={goal.id}
        className={classNames("mx-2 relative", {
          "border border-blue-400": goal.status === "INCOMPLETE",
          "border border-lime-400": goal.status === "COMPLETE",
        })}
      >
        <Flex justify="between">
          <Link href={`/goal/${goal.id}`} className="hover:text-indigo-500">
            <Flex align="center" gap="2">
              <Text className="font-semibold">{goal.title}</Text>
            </Flex>
          </Link>
          <Flex align="center" gap="1">
            <Badge color={color}>{goal.status}</Badge>
            <IoIosTrash className="text-[20px] hover:scale-150" />
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
              onClick={() => {
                axios.patch("api/goal", {
                  id: goal.id,
                  status: "INCOMPLETE",
                });
                notifyGoalupdated("Goal updated!");
                router.refresh();
              }}
              className="text-[40px] hover:scale-150"
            />
          ) : (
            <IoIosCheckmark
              onClick={() => {
                axios.patch("api/goal", {
                  id: goal.id,
                  status: "COMPLETE",
                });
                notifyGoalupdated("Goal updated!");
                router.refresh();
              }}
              className="text-[40px] hover:scale-150"
            />
          )}
        </Flex>
      </Card>
    ));

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

      <Flex align="center" direction="column" className="min-h-screen" gap="5">
        <SegmentedControl.Root defaultValue={current} size="3" className="mt-5">
          <SegmentedControl.Item
            onClick={() => setCurrent("current")}
            value="current"
          >
            <Text color="crimson">Current</Text>
          </SegmentedControl.Item>
          <SegmentedControl.Item
            value="completed"
            onClick={() => setCurrent("completed")}
          >
            <Text color="grass">Completed</Text>
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <Flex direction="column" align="center" justify="center" maxWidth="90%">
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
        </Flex>
      </Flex>
    </>
  );
};

export default ShowMobileGoal;
