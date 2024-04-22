"use client";
import FlexBar from "@/components/FlexBar";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";

const SignOutPage = () => {
  return (
    <FlexBar gap="3" className="h-screen">
      <Heading size="5" align="center">
        You have been successfully signed out.
      </Heading>
      <Link href="/">
        <button className="btn-form border-blue-400 w-[180px]">
          Return to Home
        </button>
      </Link>
    </FlexBar>
  );
};

export default SignOutPage;
