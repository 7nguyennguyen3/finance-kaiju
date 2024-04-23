import { Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FlexBar from "./FlexBar";
import { signIn } from "next-auth/react";

const UnauthorizedAccess = ({ title }: { title: string }) => {
  return (
    <FlexBar className="h-screen" gap="3">
      <Heading align="center">{title}</Heading>
      <Link href="/sign-in">
        <button className="w-40 h-14 border-red-200 border rounded-md text-white">
          Sign In
        </button>
      </Link>
      <button
        type="button"
        onClick={async () => {
          try {
            signIn("credentials", {
              email: "chopper@gmail.com",
              password: 123123123,
              callbackUrl: "https://goal-tracker-nine-iota.vercel.app/sign-in",
            });
          } catch (error) {}
        }}
        className="w-40 h-14 border-blue-400 border rounded-md text-white"
      >
        Continue as Guest
      </button>
    </FlexBar>
  );
};

export default UnauthorizedAccess;
