import { Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface Props {
  gap?: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  children: ReactNode;
  className?: string;
}

const FlexBar = ({ gap, children, className }: Props) => {
  return (
    <Flex
      justify="center"
      align="center"
      direction="column"
      gap={gap}
      className={className}
    >
      {children}
    </Flex>
  );
};

export default FlexBar;
