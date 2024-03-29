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
    where: { status: "INCOMPLETE" },
  });
  const goalsCount = await prisma.gOAL.count();

  return (
    <>
      <Heading color="sky" className="m-5">
        Current Goals
      </Heading>

      <Box maxWidth={goalsCount < 5 ? "360px" : "1080px"}>
        <Flex direction="column">
          <Grid
            columns={
              goalsCount > 12
                ? "3"
                : goalsCount > 5 && goalsCount < 8
                ? "2"
                : "1"
            }
            gap="4"
          >
            {goals.map((goal) => (
              <Card key={goal.id}>
                <Flex justify="between">
                  <Link href="/new-goal" className="hover:text-indigo-500">
                    <Text className="font-semibold">{goal.title}</Text>
                  </Link>
                  <Badge color="ruby">{goal.status}</Badge>
                </Flex>
                <Separator my="2" size="4" />
                <Blockquote className="font-normal p-3">
                  {goal.description},{" "}
                </Blockquote>
                <Text size="2" className="flex flex-row-reverse">
                  {new Date(goal.createdAt).toLocaleDateString()}
                </Text>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Box>
    </>
  );
};

export default DisplayGoals;
