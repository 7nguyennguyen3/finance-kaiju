import ChartTest from "@/components/ChartTest";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import ShowFinance from "./ShowFinance";

const FinanceTrackerPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen border m-auto max-w-screen-lg"
      direction={"column"}
      width={{ initial: "100%", md: "80%" }}
      gap="3"
      maxHeight="1080px"
    >
      <Heading className="">Welcome Jimmy!</Heading>

      <Flex className="border w-full p-3" justify="between">
        <Flex direction="column" gap="1">
          <Heading size="5">Balance: $720.19</Heading>
        </Flex>
        <Button variant="outline" className="hover:scale-110">
          Add Transaction
        </Button>
      </Flex>
      <Flex className="border w-full">
        <Flex className="border w-1/2 p-3" direction="column" gap="5">
          <ShowFinance />
        </Flex>
        <Flex className="border w-1/2" justify="center"></Flex>
      </Flex>
      <Flex width="100%">
        <ChartTest />
      </Flex>
    </Flex>
  );
};

export default FinanceTrackerPage;
