import { Flex } from "@radix-ui/themes";
import DisplayGoals from "../../components/DisplayGoals";

const CurrentGoalPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
    >
      <DisplayGoals
        color="crimson"
        status="INCOMPLETE"
        goalTitle="Current"
        headingColor="indigo"
      />
      ;
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default CurrentGoalPage;
