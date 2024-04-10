import { Box, Flex } from "@radix-ui/themes";
import FinanceDoughnutChart from "./FinanceDoughnutChart";
import ShowFinance from "./ShowFinance";
import WelcomeMessage from "./WelcomeMessage";

const FinanceTrackerPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen border m-auto"
      direction="column"
      width={{ initial: "100%", md: "80%" }}
      gap="3"
    >
      <WelcomeMessage />
      <Box className="border w-full">
        <ShowFinance />
      </Box>
      <Flex width="100%">
        <FinanceDoughnutChart />
      </Flex>
    </Flex>
  );
};

export const dynamic = "force-dynamic";

export default FinanceTrackerPage;
