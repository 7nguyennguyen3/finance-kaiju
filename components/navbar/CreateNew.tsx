import { Box, HoverCard, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const CreateNew = () => {
  return (
    <Box display={{ initial: "none", sm: "block" }}>
      <HoverCard.Root>
        <HoverCard.Trigger>
          <Flex align="center" className="hover:scale-110">
            <Text>Create </Text>
            <IoIosArrowDown />
          </Flex>
        </HoverCard.Trigger>
        <HoverCard.Content className="w-56">
          <Flex direction="column" gap="4">
            <Link href="/create-task">
              <button
                color="crimson"
                className="font-light hover:scale-110 py-1 border-red-200 border w-full text-violet-100 rounded-md"
              >
                New Task
              </button>
            </Link>
            <Link href="/new-goal">
              <button className="font-light hover:scale-110 py-1 border-violet-200 border w-full text-violet-100 rounded-md">
                New Goal
              </button>
            </Link>
          </Flex>
        </HoverCard.Content>
      </HoverCard.Root>
    </Box>
  );
};

export default CreateNew;
