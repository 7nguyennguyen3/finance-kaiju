"use client";
import { useEffect, useState } from "react";
import { Container } from "@radix-ui/themes";
import ShowTask from "./ShowTask";
import FlexBar from "@/components/FlexBar";
import CreateTask from "./CreateTask";
import { useSession } from "next-auth/react";

const DailyTaskPage = () => {
  const { data: session } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [session]);

  if (isAuthorized === null) {
    return <div>Loading...</div>; // Or any other loading state
  }

  if (isAuthorized) {
    return (
      <Container>
        <FlexBar gap="3">
          <CreateTask />
          <ShowTask />
        </FlexBar>
      </Container>
    );
  }

  return (
    <Container className="py-3 px-5 mb-20 h-screen justify-center">
      <h1 className="text-3xl text-center">
        This page is currently unavailable.
      </h1>
    </Container>
  );
};
export const dynamic = "force-dynamic";

export default DailyTaskPage;
