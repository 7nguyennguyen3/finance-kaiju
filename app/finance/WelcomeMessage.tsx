"use client";
import { CATEGORY, Finance } from "@prisma/client";
import { Button, Flex, Heading, Popover } from "@radix-ui/themes";
import axios from "axios";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WelcomeMessage = () => {
  const { data: session } = useSession();
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("FOOD");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createRecord = async () => {
    setIsLoading(true);
    await axios.post<Finance>("api/finance", {
      amount: amount,
      category: category,
      credentialsEmail: session?.user?.email,
    });
    router.refresh();
    setIsLoading(false);
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
            <Popover.Content align="center">
              <Flex direction="column" gap="4" className="m-3">
                <input
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Amount"
                  className="hover:scale-110 p-3 rounded-md bg-transparent border 
                  border-violet-200 focus:outline-none focus:border-2"
                />

                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="hover:scale-110 p-3 rounded-md bg-transparent border 
                  border-blue-200 focus:outline-none focus:border-2"
                >
                  {Object.values(CATEGORY).map((category) => (
                    <option
                      key={category}
                      className="bg-black hover:text-red-200"
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  onClick={createRecord}
                  disabled={amount === 0 || isLoading}
                  className={classNames({
                    "border border-violet-400 rounded-md py-2": true,
                    "hover:scale-110": amount !== 0,
                    "opacity-50 cursor-not-allowed": amount === 0 || isLoading,
                  })}
                >
                  Submit
                </button>
              </Flex>
            </Popover.Content>
          </Popover.Root>
        </>
      )}
    </Flex>
  );
};

export default WelcomeMessage;
