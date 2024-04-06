import chicken from "@/public/walking-cock.gif";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Flex align="center" justify="center">
        <Image src={chicken} alt="chicken walking" />
      </Flex>
    </>
  );
}

export const dynamic = "force-dynamic";
