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
      width="80%"
      gap="3"
      maxHeight="1080px"
    >
      <Heading className="">Welcome Jimmy!</Heading>

      <Flex className="border w-full p-3" justify="between">
        <Flex direction="column" gap="1">
          <Heading>Balance: $720.19</Heading>
          <Text>Last Transaction: $4.36 - McDonald</Text>
        </Flex>
        <Flex direction="column" gap="2">
          <Button>Add Expense</Button>
          <Button>Add Income</Button>
        </Flex>
      </Flex>
      <Flex className="border w-full">
        <Flex className="border w-1/2 p-3" direction="column" gap="5">
          <Text size="5">Transaction Summary</Text>
          <ShowFinance />
        </Flex>
        <Flex className="border w-1/2" justify="center"></Flex>
      </Flex>
      <Flex className="border" width="100%">
        <ChartTest />
      </Flex>
    </Flex>
  );
};

export default FinanceTrackerPage;
