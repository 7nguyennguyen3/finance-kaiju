import React, { cache } from "react";
import GoalDetails from "./GoalDetails";
import prisma from "@/prisma/client";
import { GOAL } from "@prisma/client";
import { notFound } from "next/navigation";

const fetchGoal = cache((goalId: number) => {
  return prisma.gOAL.findUnique({
    where: { id: goalId },
  });
});

const DetailGoalPage = async ({ params }: { params: { id: string } }) => {
  const goal = await fetchGoal(parseInt(params.id));
  if (!goal) notFound();

  return (
    <div>
      <GoalDetails goal={goal} />
    </div>
  );
};

export default DetailGoalPage;
