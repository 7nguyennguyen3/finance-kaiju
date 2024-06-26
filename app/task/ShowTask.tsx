import prisma from "@/prisma/client";
import { Badge, Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import Image from "next/image";

interface Task {
  id: string;
  imgUrl: string;
  createdAt: string; // or Date, depending on how you handle dates
  status: string;
  title: string;
  description: string;
}

const ShowTask = async () => {
  const response = await axios.get("/api/task");
  const tasks: Task[] = response.data;

  return (
    <Flex direction="row" align="center" justify="center">
      <Box
        maxWidth={{
          xs: "480px",
          sm: "540px",
          md: "1080px",
        }}
        mb="5"
        px={{ xs: "5" }}
      >
        <Grid columns={{ sm: "1", md: "2" }} gap="7">
          {tasks.map((task) => (
            <Card
              key={task.id}
              variant="surface"
              className="transition-transform duration-200 hover:scale-105 m-2 border border-red-100 max-w-[90%] mx-auto"
            >
              <Flex justify="center" direction="column" align="center" gap="5">
                <div
                  style={{
                    position: "relative",
                    width: "90%",
                    height: "400px",
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
                      timeZone: "America/Los_Angeles",
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
