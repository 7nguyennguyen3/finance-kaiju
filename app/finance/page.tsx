import { Box, Container, Flex } from "@radix-ui/themes";
import FinanceDoughnutChart from "./FinanceDoughnutChart";
import ShowFinance from "./ShowFinance";
import WelcomeMessage from "./WelcomeMessage";

const FinanceTrackerPage = () => {
  return (
    <Container>
      <Flex
        justify="center"
        align="center"
        className="min-h-screen border m-auto"
        direction="column"
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
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default FinanceTrackerPage;
