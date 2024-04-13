import prisma from "@/prisma/client";
import {
  Container,
  Flex,
  Grid,
  SegmentedControl,
  Text,
} from "@radix-ui/themes";
import GoalScrollArea from "./goal/GoalScrollArea";
import ShowMobileGoal from "./goal/ShowMobileGoal";

const DisplayGoals = async () => {
  const goals = await prisma.gOAL.findMany({
    where: {
      status: "INCOMPLETE",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const completedGoals = await prisma.gOAL.findMany({
    where: {
      status: "COMPLETE",
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <Container width="1080px" className="border">
      <Flex
        align="center"
        justify="center"
        className="min-h-screen"
        direction="column"
        display={{ initial: "none", md: "flex" }}
      >
        <Grid
          columns={{ initial: "1", xs: "1", md: "2" }}
          gap="5"
          p="5"
          className="border border-slate-500 rounded-md"
        >
          <GoalScrollArea title="Current" goals={goals} color="crimson" />
          <GoalScrollArea
            title="Completed"
            goals={completedGoals}
            color="green"
          />
        </Grid>
      </Flex>
      <Flex
        align="center"
        className="min-h-screen"
        direction="column"
        display={{ initial: "flex", xs: "flex", md: "none" }}
      >
        <ShowMobileGoal goals={goals} completedGoals={completedGoals} />
      </Flex>
    </Container>
  );
};

export default DisplayGoals;
