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
      <DisplayGoals
        color="green"
        status="COMPLETE"
        goalTitle="Completed"
        headingColor="green"
      />
      ;
    </Flex>
  );
};

export default CompletedGoalPage;
