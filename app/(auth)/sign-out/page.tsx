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
      <Heading size="5" align="center">
        You have been successfully signed out.
      </Heading>
      <Link href="/">
        <button
          className="font-light hover:scale-110 
      py-1 border-violet-400 border w-40 text-violet-100 rounded-md"
        >
          Return to Home
        </button>
      </Link>
    </Flex>
  );
};

export default SignOutPage;
