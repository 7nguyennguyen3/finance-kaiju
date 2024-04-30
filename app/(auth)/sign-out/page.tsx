"use client";
import FlexBar from "@/components/FlexBar";
import { Flex, Heading } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignOutPage = () => {
  const { status } = useSession();

  return (
    <FlexBar gap="3" className="h-screen max-w-[400px]">
      {status === "unauthenticated" ? (
        <>
          <Heading align="center">
            You have been successfully signed out.
          </Heading>
          <Link href="/">
            <button className="btn-form border-blue-400 w-[180px]">
              Return to Home
            </button>
          </Link>
        </>
      ) : (
        <>
          <button
            className="border p-5 rounded-md w-[200px]"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </>
      )}
    </FlexBar>
  );
};

export default SignOutPage;
