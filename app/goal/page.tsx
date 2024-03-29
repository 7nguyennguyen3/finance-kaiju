import React from "react";
import DisplayGoals from "../DisplayGoals";
import { Flex } from "@radix-ui/themes";

const CurrentGoalPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-screen"
      direction="column"
    >
      <DisplayGoals />;
    </Flex>
  );
};

export default CurrentGoalPage;
