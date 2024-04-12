import prisma from "@/prisma/client";
import { Badge, Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";

const ShowTask = async () => {
  const tasks = await prisma.tASK.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      className="min-h-screen mb-20"
    >
      <Box
        maxWidth={{
          initial: "360px",
          xs: "460px",
          sm: "540px",
          md: "820px",
        }}
        width={{ initial: "90%", xs: "95%" }}
        mb="5"
      >
        <Grid columns={{ sm: "1", md: "2" }} gap="7">
          {tasks.map((task) => (
            <Card
              key={task.id}
              variant="surface"
              className="transition-transform duration-200 hover:scale-105 my-5 border border-red-100"
            >
              <Flex justify="center" direction="column" align="center" gap="5">
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    height: "320px",
                  }}
                >
                  <Image
                    src={task.imgUrl}
                    layout="fill"
                    objectFit="contain"
                    alt="task image"
                  />
                </div>
                <Flex align="center" justify="between" width="100%">
                  <Text size="1" weight="medium">
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                      timeZone: "UTC",
                    })}
                  </Text>
                  <Badge color="green">{task.status}</Badge>
                </Flex>
                <Heading size="5">{task.title}</Heading>

                <Text>{task.description}</Text>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default ShowTask;
