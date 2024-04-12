import { Box, Container, Flex, Heading } from "@radix-ui/themes";
import FinanceDoughnutChart from "./FinanceDoughnutChart";
import ShowFinance from "./ShowFinance";
import WelcomeMessage from "./WelcomeMessage";
import Link from "next/link";

const FinanceTrackerPage = () => {
  return (
    <Container className="px-5">
      <Flex
        justify="center"
        align="center"
        className="min-h-screen m-auto"
        direction="column"
        gap="3"
      >
        <WelcomeMessage />
        <Box className="w-full">
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
