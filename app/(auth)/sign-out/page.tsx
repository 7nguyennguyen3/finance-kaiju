"use client";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignOutPage = () => {
  const { status } = useSession();

  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen"
      direction="column"
      gap="3"
    >
      {status === "unauthenticated" && (
        <>
          <Heading>You are not currently signed in.</Heading>
          <Button>
            <Link href="/">Return to Home</Link>
          </Button>
        </>
      )}
      {status === "authenticated" && (
        <>
          <Text size="4">Are you sure yosu want to sign out?</Text>
          <button
            className="border border-red-200 px-5 py-2 rounded-md hover:scale-110"
            onClick={async () => {
              await signOut({
                callbackUrl: "https://goal-tracker-nine-iota.vercel.app",
              });
            }}
          >
            Sign Out
          </button>
        </>
      )}
    </Flex>
  );
};

export default SignOutPage;
