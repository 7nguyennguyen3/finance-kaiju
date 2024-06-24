"use client";
import { Container } from "@radix-ui/themes";
import ShowTask from "./ShowTask";
import FlexBar from "@/components/FlexBar";
import CreateTask from "./CreateTask";
import { useSession } from "next-auth/react";

const DailyTaskPage = () => {
  const { data: session, status } = useSession();

  return session?.user?.email ? (
    <Container>
      <FlexBar gap="3">
        <CreateTask />
        <ShowTask />
      </FlexBar>
    </Container>
  ) : (
    <Container className="py-3 px-5 mb-20 h-screen justify-center">
      <h1 className="text-3xl text-center">
        This page is currently unavailable.
      </h1>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default DailyTaskPage;
