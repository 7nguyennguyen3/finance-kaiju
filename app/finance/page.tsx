import { Box, Container, Flex } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import FinanceDoughnutChart from "./FinanceDoughnutChart";
import ShowFinance from "./ShowFinance";
import WelcomeMessage from "./WelcomeMessage";

const FinanceTrackerPage = () => {
  return (
    <Container className="px-5">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
