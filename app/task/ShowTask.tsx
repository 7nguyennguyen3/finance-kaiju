import prisma from "@/prisma/client";
import { Badge, Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";

const ShowTask = async () => {
  const tasks = await prisma.tASK.findMany();

  return (
    <Flex
      direction="row"
      align="center"
      justify="center"
      className="min-h-screen"
    >
      <Box
        maxWidth={{
          initial: "360px",
          xs: "460px",
          sm: "540px",
          md: "820px",
        }}
        width={{ initial: "90%", xs: "95%" }}
      >
        <Grid columns={{ sm: "1", md: "2" }} gap="7">
          {tasks.map((task) => (
            <Card
              key={task.id}
              variant="surface"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Flex justify="center" direction="column" align="center" gap="2">
                <div
                  style={{
                    position: "relative",
                    width: "720px",
                    height: "360px",
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
                    {new Date(task.createdAt).toLocaleDateString()}
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
