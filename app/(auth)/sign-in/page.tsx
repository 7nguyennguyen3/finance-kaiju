"use client";
import { Heading, Flex, Text, Button, Separator } from "@radix-ui/themes";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SignInPage = () => {
  const { status, data: session } = useSession();
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="min-h-screen"
      gap="4"
    >
      {status === "authenticated" && (
        <>
          <Heading>Welcome {session.user!.name}!</Heading>
          <Text>You are already signed in.</Text>
        </>
      )}
      {status === "unauthenticated" && (
        <>
          <Heading size="6">Sign In</Heading>
          <form className="w-72">
            <Flex direction="column" gap="3" justify="center">
              <input
                placeholder="Email"
                type="email"
                className="px-2 py-2 rounded-md"
              />
              <input
                placeholder="Password"
                type="password"
                className="px-2 py-2 rounded-md my-1"
              />
              <button
                type="submit"
                className="border border-blue-200 py-2 px-5 rounded-md hover:scale-110"
              >
                Sign In
              </button>
              <Separator size="4" color="blue" className="my-1" />

              <button
                onClick={async () => {
                  signIn("google", {
                    callbackUrl: "https://goal-tracker-nine-iota.vercel.app",
                  });
                }}
                type="button"
                className="border border-red-200 py-2 px-5 rounded-md hover:scale-110"
              >
                <Flex align="center" gap="2" justify="center">
                  <Text>Sign in with Google</Text>
                  <FaGoogle size="18" className="text-red-400" />
                </Flex>
              </button>
              <button
                type="button"
                className="border border-violet-200 py-2 px-5 rounded-md hover:scale-110"
              >
                <Flex align="center" gap="2" justify="center">
                  <Text>Sign in with GitHub</Text>
                  <FaGithub size="18" className="text-violet-400" />
                </Flex>
              </button>
            </Flex>
          </form>
        </>
      )}
    </Flex>
  );
};

export default SignInPage;
