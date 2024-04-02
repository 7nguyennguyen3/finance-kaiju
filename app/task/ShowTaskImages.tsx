"use client";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";

const ShowTaskImages = async () => {
  const tasks = await prisma.tASK.findMany();

  return (
    <Flex direction="column" gap="3" align="center" justify="center">
      {tasks.map((task) => (
        <Image src={task.imgUrl} alt="" height={100} width={100} />
      ))}
    </Flex>
  );
};

export default ShowTaskImages;
