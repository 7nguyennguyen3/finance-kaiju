import prisma from "@/prisma/client";
import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";

const DisplayGoals = async () => {
  const goals = await prisma.gOAL.findMany();

  return (
    <>
      <Heading color="amber" className="m-5">
        Current Goals
      </Heading>

      <Box maxWidth="360px">
        <Flex direction="column" className="px-3" gap="3">
          {goals.map((goal) => (
            <Card>
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
        </Flex>
      </Box>
    </>
  );
};

export default DisplayGoals;
