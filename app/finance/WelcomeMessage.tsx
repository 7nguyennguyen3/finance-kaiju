"use client";
import { CATEGORY, Finance } from "@prisma/client";
import {
  Button,
  DropdownMenu,
  Flex,
  Heading,
  Popover,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

const WelcomeMessage = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState();

  const createRecord = async () => {
    await axios.post<Finance>("api/finance", {});
  };

  return (
    <Flex justify="between" className="w-full p-5">
      {session && (
        <>
          <Heading>Welcome {session?.user?.name}!</Heading>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="outline">Add Record</Button>
            </Popover.Trigger>
            <Popover.Content>
              <Flex direction="column" gap="2">
                <input type="number" placeholder="amount" />
                <select>
                  {Object.values(CATEGORY).map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </>
      )}
    </Flex>
  );
};

export default WelcomeMessage;
