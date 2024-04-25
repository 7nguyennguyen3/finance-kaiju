import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const records = [1, 2, 3, 4, 5];

const loading = () => {
  const FinanceInfo = ({ display }: any) => {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <Flex
          className="p-5 border-2 rounded-md"
          display={display}
          direction="column"
        >
          <Heading>
            <Skeleton className="p-1 my-1" />
          </Heading>

          <Text className="font-semibold" size="4">
            <Skeleton className="p-1 my-1" />
          </Text>
          <Text className="font-semibold" size="4">
            <Skeleton className="p-1 my-1" />
          </Text>
          <Text>
            <Skeleton className="p-1 my-1" />
          </Text>
        </Flex>
      </SkeletonTheme>
    );
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Container>
        <Flex
          align="center"
          justify="between"
          className=" max-w-[1000px] m-auto"
        >
          <Box className="w-[200px]">
            <Skeleton className="p-3 mb-3" />
          </Box>
          <Box className="w-[100px]">
            <Skeleton className="p-3 mb-3" />
          </Box>
        </Flex>
      </Container>
      <Flex direction="column" maxWidth="1000px" className="m-auto">
        <FinanceInfo display={{ initial: "flex", sm: "none" }} />
        <Grid columns={{ initial: "1", sm: "35fr 65fr" }}>
          <FinanceInfo display={{ initial: "none", sm: "flex" }} />
          <Box height="570px" className="border-2 rounded-md">
            <Grid
              columns="1fr 8fr 1fr"
              className="py-5"
              justify="center"
              height="100%"
            >
              <button className="m-auto hover:scale-110">
                <Skeleton />
              </button>
              <Flex direction="column" gap="2" className="relative">
                <Text>
                  <Skeleton className="p-2" />
                </Text>
                <Flex justify="between" align="center">
                  <Skeleton className="p-2 px-20 my-2" />
                  <Skeleton className="p-2 px-10 my-2" />
                </Flex>
                <Skeleton className="my-1 p-3" />
                <Skeleton className="my-1 p-3" />
                <Skeleton className="my-1 p-3" />
                <Skeleton className="my-1 p-3" />
                <Skeleton className="my-1 p-3" />
              </Flex>
              <button className="m-auto hover:scale-110  ">
                <Skeleton />
              </button>
            </Grid>
          </Box>
        </Grid>
      </Flex>
    </SkeletonTheme>
  );
};

export default loading;
