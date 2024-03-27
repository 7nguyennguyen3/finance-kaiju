"use client";
import { GOAL } from "@prisma/client";
import { Badge, Button, Card, Flex, Heading } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const GoalDetails = ({ goal }: { goal: GOAL }) => {
  const router = useRouter();
  const { id, title, description, status, createdAt, updatedAt } = goal;

  const completeGoal = async () => {
    await axios.patch(`/api/goal/${id}`), { status: "COMPLETE" };
    router.push("/");
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
        <Heading>{title}</Heading>
        <Badge>{status}</Badge>
        <Card>{description}</Card>
        <Button onClick={completeGoal}>I completed this goal</Button>
      </Flex>
    </>
  );
};

export default GoalDetails;
