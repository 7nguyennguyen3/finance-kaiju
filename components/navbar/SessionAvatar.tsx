"use client";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaRegUserCircle } from "react-icons/fa";

const SessionAvatar = () => {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "unauthenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box
              pb={{ initial: "2", sm: "0" }}
              className="hover:cursor-pointer hover:scale-110"
            >
              <FaRegUserCircle size="24" />
            </Box>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56" align="center">
            <Flex gap="3" className="p-2" justify="center" direction="column">
              <Text size="2" align="center">
                Already have an account?
              </Text>
              <Link href="/sign-in" className="w-full">
                <button className="font-light hover:scale-110 py-1 border-violet-400 border w-full text-violet-100 rounded-md">
                  Sign In
                </button>
              </Link>
            </Flex>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}

      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Box pb={{ initial: "2", sm: "0" }}>
              <Avatar
                src={session.user?.image || ""}
                fallback="?"
                radius="full"
                size="2"
              />
            </Box>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-56" align="center">
            <Flex direction="column" gap="3" className="p-2">
              <Text size="2" align="center">
                {session.user?.email}
              </Text>

              <Link href="/sign-out">
                <button
                  onClick={() => {
                    signOut({
                      callbackUrl:
                        "https://goal-tracker-nine-iota.vercel.app/sign-out",
                    });
                  }}
                  className="font-light hover:scale-110 py-1 border-red-200 border w-full text-violet-100 rounded-md"
                >
                  Sign Out
                </button>
              </Link>
            </Flex>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
};

export default SessionAvatar;
