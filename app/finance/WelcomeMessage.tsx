"use client";
import { CATEGORY, Finance } from "@prisma/client";
import { Button, Flex, Heading, Popover } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const WelcomeMessage = () => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("FOOD");
  const userEmail = session?.user?.email;
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Finance,
    {
      amount: number;
      category: string;
      credentialsEmail: string | null | undefined;
    },
    unknown,
    unknown
  >({
    mutationFn: (newRecord) => {
      return axios
        .post<Finance>("api/finance", newRecord)
        .then((response) => response.data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });

  if (!userEmail)
    return (
      <>
        <Heading>Please sign in to access the finance app.</Heading>
        <Link href="/sign-in">
          <button className="w-40 h-14 border-red-200 border rounded-md">
            Sign In
          </button>
        </Link>
      </>
    );

  return (
    <Flex justify="between" className="w-full py-1">
      {session && (
        <>
          <Heading>Welcome {session?.user?.name}!</Heading>
          <Popover.Root>
            <Popover.Trigger>
              <Button variant="outline" size="3">
                Add Record
              </Button>
            </Popover.Trigger>
            <Popover.Content align="center">
              <form
                onSubmit={(event) => {
                  try {
                    event.preventDefault();
                    setIsLoading(true);
                    mutation.mutate({
                      amount: amount,
                      category: category,
                      credentialsEmail: userEmail,
                    });
                    setIsLoading(false);
                  } catch (error) {
                    console.log(error);
                    setIsLoading(false);
                  }
                }}
              >
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
                    onChange={(e) => setCategory(e.target.value.toUpperCase())}
                    className="p-3 rounded-md bg-transparent border 
                  border-blue-200 focus:outline-none focus:border-2"
                  >
                    {Object.values(CATEGORY).map((category) => (
                      <option
                        key={category}
                        className="bg-black hover:text-red-200"
                      >
                        {category.charAt(0) +
                          category.toLocaleLowerCase().slice(1)}
                      </option>
                    ))}
                  </select>
                  <Popover.Close>
                    <button
                      type="submit"
                      disabled={amount === 0 || isLoading}
                      className={classNames({
                        "border border-violet-400 rounded-md py-2": true,
                        "hover:scale-110": amount !== 0,
                        "opacity-50 cursor-not-allowed":
                          amount === 0 || isLoading,
                      })}
                    >
                      Submit
                    </button>
                  </Popover.Close>
                </Flex>
              </form>
            </Popover.Content>
          </Popover.Root>
        </>
      )}
    </Flex>
  );
};

export default WelcomeMessage;
