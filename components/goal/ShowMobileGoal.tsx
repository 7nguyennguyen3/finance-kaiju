"use client";
import {
  Badge,
  Blockquote,
  Card,
  Flex,
  Link,
  ScrollArea,
  SegmentedControl,
  Separator,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { IoEnterOutline } from "react-icons/io5";

const ShowMobileGoal = ({ goals, completedGoals }: any) => {
  const [current, setCurrent] = useState("current");

  return (
    <>
      <Flex align="center" direction="column" className="min-h-screen" gap="5">
        <SegmentedControl.Root defaultValue="current" size="3" className="mt-5">
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
        <ScrollArea
          scrollbars="vertical"
          size="3"
          style={{ height: "80vh", maxWidth: "80vw" }}
          className="pr-10"
        >
          <Flex direction="column" gap="5">
            {current === "current" &&
              goals.map((goal: any) => (
                <Card
                  key={goal.id}
                  className="mx-2 transition-transform duration-200 hover:scale-110 border border-red-100"
                >
                  <Flex justify="between">
                    <Link
                      href={`/goal/${goal.id}`}
                      className="hover:text-indigo-500"
                    >
                      <Flex align="center" gap="2">
                        <Text className="font-semibold">{goal.title}</Text>
                        <IoEnterOutline />
                      </Flex>
                    </Link>
                    <Badge color="crimson">{goal.status}</Badge>
                  </Flex>
                  <Separator my="2" size="4" />
                  <Blockquote className="font-normal p-3">
                    {goal.description}
                  </Blockquote>
                  <Text
                    size="2"
                    className="flex flex-row-reverse"
                    color="violet"
                    weight="light"
                    highContrast
                  >
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </Text>
                </Card>
              ))}
            {current === "completed" &&
              completedGoals.map((goal: any) => (
                <Card
                  key={goal.id}
                  className="mx-2 transition-transform duration-200 hover:scale-110 border border-red-100"
                >
                  <Flex justify="between">
                    <Link
                      href={`/goal/${goal.id}`}
                      className="hover:text-indigo-500"
                    >
                      <Flex align="center" gap="2">
                        <Text className="font-semibold">{goal.title}</Text>
                        <IoEnterOutline />
                      </Flex>
                    </Link>
                    <Badge color="green">{goal.status}</Badge>
                  </Flex>
                  <Separator my="2" size="4" />
                  <Blockquote className="font-normal p-3">
                    {goal.description}
                  </Blockquote>
                  <Text
                    size="2"
                    className="flex flex-row-reverse"
                    color="violet"
                    weight="light"
                    highContrast
                  >
                    {new Date(goal.createdAt).toLocaleDateString()}
                  </Text>
                </Card>
              ))}
          </Flex>
        </ScrollArea>
      </Flex>
    </>
  );
};

export default ShowMobileGoal;
