import { Flex } from "@radix-ui/themes";
import DisplayGoals from "../../components/DisplayGoals";

const CompletedGoalPage = () => {
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
};

export const dynamic = "force-dynamic";

export default CompletedGoalPage;
