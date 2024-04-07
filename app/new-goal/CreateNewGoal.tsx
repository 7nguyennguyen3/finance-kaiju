"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { goalSchema } from "../validationSchema";
import Image from "next/image";

const CreateNewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  type GoalValidation = z.infer<typeof goalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalValidation>({ resolver: zodResolver(goalSchema) });

  return (
    <>
      <Flex
        direction="column"
        gap="5"
        align="center"
        className="min-h-screen m-auto "
        justify="center"
        maxWidth={{ initial: "100%", md: "720px" }}
        width="100%"
      >
        <Flex
          justify="center"
          align="center"
          className="border border-red-200"
          width="66%"
          height="300px"
        >
          <Image
            src="/football-soccer.gif"
            alt="football gif"
            width={200}
            height={100}
          />
        </Flex>
        <form
          className="w-2/3"
          onSubmit={handleSubmit(async () => {
            await axios.post("/api/goal", {
              title: title,
              description: description,
            });
            router.push("/goal");
          })}
        >
          <Flex direction="column" gap="5" align="center">
            <Heading size={{ initial: "5", sm: "6" }}>
              Fill out information to create goal!
            </Heading>
            <div className="w-full">
              <input
                {...register("title")}
                placeholder="Title of Task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 pb-7 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
              />
              {errors.title && (
                <Box className="mt-2">
                  <Text color="crimson">{errors.title.message}</Text>
                </Box>
              )}
            </div>
            <div className="w-full">
              <textarea
                {...register("description")}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-2 pb-12 py-3  focus:border-2 focus:border-white focus:outline-none rounded-md"
              />
              {errors.description && (
                <Text color="crimson">{errors.description.message}</Text>
              )}
            </div>
            <Button variant="classic" type="submit">
              Create Goal
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default CreateNewGoal;
