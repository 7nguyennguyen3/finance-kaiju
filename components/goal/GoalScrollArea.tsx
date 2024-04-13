import {
  Badge,
  Blockquote,
  Box,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Separator,
  Text,
} from "@radix-ui/themes";
import Link from "next/link";
import { IoEnterOutline } from "react-icons/io5";

interface Props {
  goals: any;
  color: "crimson" | "green";
  title: "Current" | "Completed";
}

const GoalScrollArea = async ({ title, goals, color }: Props) => {
  return (
    <ScrollArea
      scrollbars="vertical"
      size="3"
      type="always"
      style={{ height: "720px", maxWidth: "40vw" }}
      className="pt-10 pb-5 pr-10 rounded-md"
    >
      <Heading align="center" size="5" className="mb-3">
        {title}
      </Heading>
      <Box>
        <Flex direction="column" gap="5" overflow={"clip"}>
          {goals.map((goal: any) => (
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
        </Flex>
      </Box>
    </ScrollArea>
  );
};

export default GoalScrollArea;
