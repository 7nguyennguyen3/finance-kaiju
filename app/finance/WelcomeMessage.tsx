"use client";
import UnauthorizedAccess from "@/components/UnauthorizedAccess";
import { CATEGORY, Finance } from "@prisma/client";
import { Button, Flex, Heading, Popover } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notifyRecordAdded = (message: string) =>
  toast(`${message}`, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

const WelcomeMessage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const userEmail = session?.user?.email;
  const queryClient = useQueryClient();
  const mutation = useMutation<
    Finance,
    {
      amount: number;
      category: string;
      credentialsEmail: string | null | undefined;
      userEmail: string;
    },
    unknown,
    unknown
  >({
    mutationFn: (newRecord) => {
      return axios
        .post<Finance>("api/finance", newRecord)
        .then((response) => response.data);
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      notifyRecordAdded("🌱 Record Created");
      queryClient.invalidateQueries();
    },
  });

  if (status === "unauthenticated")
    return (
      <UnauthorizedAccess title="Please sign in to access the finance app." />
    );

  if (!session) return null;

  const isCredentialsUser = !session.user?.image;

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
                    const emailData = isCredentialsUser
                      ? { credentialsEmail: userEmail }
                      : { userEmail: userEmail };
                    mutation.mutate({
                      amount: amount,
                      category: category,
                      ...emailData,
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
                  <Popover.Root>
                    <Popover.Trigger>
                      <button className="btn-form border-blue-400">
                        {category === "" ? "Select Category" : category}
                      </button>
                    </Popover.Trigger>
                    <Popover.Content>
                      {[...Object.values(CATEGORY)].map((category) => (
                        <Popover.Close key={category}>
                          <Flex
                            onClick={() => {
                              setCategory(category);
                            }}
                            direction="column"
                            className="border border-slate-300 mb-[6px] rounded-md px-3 py-[2px] hover:bg-slate-500"
                          >
                            {category.charAt(0) +
                              category.toLocaleLowerCase().slice(1)}
                          </Flex>
                        </Popover.Close>
                      ))}
                    </Popover.Content>
                  </Popover.Root>

                  <Popover.Close>
                    <button
                      type="submit"
                      disabled={amount === 0 || isLoading || category === ""}
                      className={classNames({
                        "btn-form border-violet-400": true,
                        "opacity-50 cursor-not-allowed hover:scale-100":
                          amount === 0 || isLoading || category === "",
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
