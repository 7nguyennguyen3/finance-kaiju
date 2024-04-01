import prisma from "@/prisma/client";
import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

const DisplayGoals = async () => {
  const goals = await prisma.gOAL.findMany({
    where: { status: "COMPLETE" },
  });
  const goalsCount = await prisma.gOAL.count({
    where: { status: "COMPLETE" },
  });

  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
      gap="3"
    >
      <Heading color="sky" className="m-5">
        Completed Goals
      </Heading>

      <Box maxWidth={goalsCount < 5 ? "360px" : "1080px"} width="95%">
        <Flex direction="column">
          <Grid
            columns={
              goalsCount > 12
                ? "3"
                : goalsCount > 5 && goalsCount < 9
                ? "2"
                : "1"
            }
            gap="4"
          >
            {goals.map((goal) => (
              <Card key={goal.id}>
                <Flex justify="between">
                  <Link
                    href={`/goal/${goal.id}`}
                    className="hover:text-indigo-500"
                  >
                    <Text className="font-semibold">{goal.title}</Text>
                  </Link>
                  <Badge color="green">{goal.status}</Badge>
                </Flex>
                <Separator my="2" size="4" />
                <Blockquote className="font-normal p-3">
                  {goal.description},
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
          </Grid>
        </Flex>
      </Box>
    </Flex>
  );
};

export default DisplayGoals;
