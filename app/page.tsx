import { Flex } from "@radix-ui/themes";
import DisplayGoals from "./DisplayGoals";

export default async function Home() {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
    >
      <DisplayGoals />
    </Flex>
  );
}

export const dynamic = "force-dynamic";
