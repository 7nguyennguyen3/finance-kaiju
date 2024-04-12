"use client";
import chicken from "@/public/walking-cock.gif";
import { Flex, Heading } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Flex align="center" justify="center" direction="column" gap="3">
        <Image src={chicken} alt="chicken walking" />
        <Heading>Hello Anh</Heading>
        <button
          type="button"
          onClick={async () => {
            try {
              signIn("credentials", {
                email: "chopper@gmail.com",
                password: 123123123,
                callbackUrl:
                  "https://goal-tracker-nine-iota.vercel.app/finance",
              });
            } catch (error) {}
          }}
          className="border border-blue-200 py-2 px-5 rounded-md hover:scale-110"
        >
          Bấm Vào Nút Này
        </button>
      </Flex>
    </>
  );
}

export const dynamic = "force-dynamic";
