import { Flex } from "@radix-ui/themes";
import CreateNewGoal from "./CreateNewGoal";

const NewGoalPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
      gap="3"
    >
      <CreateNewGoal />
    </Flex>
  );
};

export default NewGoalPage;
