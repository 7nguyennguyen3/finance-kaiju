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
import { IoEnterOutline } from "react-icons/io5";

interface Props {
  status: "COMPLETE" | "INCOMPLETE";
  color: "crimson" | "green";
  goalTitle: "Current" | "Completed";
  headingColor: "indigo" | "green";
}

const DisplayGoals = async ({
  status,
  color,
  goalTitle,
  headingColor,
}: Props) => {
  const goals = await prisma.gOAL.findMany({
    where: {
      status: status,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <>
      <Heading color={headingColor} className="m-5">
        {`${goalTitle} Goals`}
      </Heading>

      <Box
        maxWidth={{
          initial: "360px",
          xs: "460px",
          sm: "540px",
          md: "820px",
          xl: "1280px",
        }}
        width={{ initial: "90%", xs: "95%" }}
        mb="5"
      >
        <Flex direction="column">
          <Grid columns={{ sm: "1", md: "2", xl: "3" }} gap="6">
            {goals.map((goal) => (
              <Card
                key={goal.id}
                className="transition-transform duration-200 hover:scale-110 border border-red-100"
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
                  <Badge color={color}>{goal.status}</Badge>
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
          </Grid>
        </Flex>
      </Box>
    </>
  );
};

export default DisplayGoals;
