"use client";
import { GOAL } from "@prisma/client";
import { Badge, Button, Card, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  goal?: GOAL;
}

const GoalDetails = ({ goal }: Props) => {
  const router = useRouter();

  const updateGoal = async () => {
    await axios.patch("/api/goal/" + goal?.id);
    router.refresh();
  };

  return (
    <>
      <Flex
        direction="column"
        justify="center"
        align="center"
        gap="3"
        className="min-h-screen"
      >
        <Heading>{goal?.title}</Heading>
        <Badge>{goal?.status}</Badge>
        <Card>{goal?.description}</Card>
        <Button onClick={updateGoal}>I completed this goal</Button>
      </Flex>
    </>
  );
};

export default GoalDetails;
