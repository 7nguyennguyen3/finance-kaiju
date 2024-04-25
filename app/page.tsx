"use client";
import chicken from "@/public/walking-cock.gif";
import { Container, Flex, Grid, Heading } from "@radix-ui/themes";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="3"
        className="border h-screen"
      >
        <Flex justify="between" className="w-full p-5">
          <Heading className="self-end">Welcome User!</Heading>
        </Flex>
        <Grid
          columns="25fr 45fr 30fr"
          gap="2"
          className="border w-full"
          align="center"
          justify="center"
        >
          <div className="h-[500px] border">
            <Flex gap="5" direction="column" className="p-5">
              <div className="w-full h-[60px] bg-slate-400">Balance</div>
              <div className="w-full h-[60px] bg-slate-400">Expense</div>
              <div className="w-full h-[60px] bg-slate-400">
                Biggest Transaction
              </div>

              <div className="flex justify-between">
                <div className="w-[35%] h-[60px] bg-slate-400">???</div>
                <div className="w-[35%] h-[60px] bg-slate-400">???</div>
              </div>
            </Flex>
          </div>
          <div className="h-[500px] border">
            <Flex gap="5" direction="column" className="p-5">
              <div className="w-full h-[60px] bg-slate-400">Latest Goals</div>
              <div className="w-full h-[60px] bg-slate-400">Goal 1 to 3</div>
              <div className="w-full h-[60px] bg-slate-400">
                Latest Completed Goals
              </div>
              <div className="w-full h-[60px] bg-slate-400">
                Completed Goal 1 to 3
              </div>
            </Flex>
          </div>
          <Flex className="w-full h-full p-5" direction="column" gap="2">
            <Flex className="w-full border-2 h-[50%]">
              <Image src={chicken} alt="chicken walking" />
            </Flex>
            <Flex className="w-full border-2 h-[50%]"></Flex>
          </Flex>
        </Grid>
      </Flex>
    </Container>
  );
}

export const dynamic = "force-dynamic";
