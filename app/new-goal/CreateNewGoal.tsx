"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { goalSchema } from "../validationSchema";

const CreateNewGoal = () => {
  const [eTitle, setTitle] = useState("");
  const [eDescription, setDescription] = useState("");
  const router = useRouter();

  type GoalValidation = z.infer<typeof goalSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalValidation>({ resolver: zodResolver(goalSchema) });

  return (
    <Flex
      direction="column"
      gap="5"
      align="center"
      className="min-h-screen border border-sky-500 m-auto"
      justify="center"
      maxWidth={{ initial: "100%", md: "800px" }}
      width="95%"
    >
      <form
        className="w-3/4"
        onSubmit={handleSubmit(async () => {
          await axios.post("/api/goal", {
            title: eTitle,
            description: eDescription,
          });
          router.push("/goal");
        })}
      >
        <Flex direction="column" gap="5" align="center">
          <Heading>Fill out information to create goal!</Heading>
          <div className="w-full">
            <input
              {...register("title")}
              placeholder="Title of Task"
              value={eTitle}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 pb-7 py-3 mb-2 focus:border-2 focus:border-white focus:outline-none rounded-md"
            />
            {errors.title && (
              <Text color="crimson">{errors.title.message}</Text>
            )}
          </div>
          <div className="w-full">
            <textarea
              {...register("description")}
              placeholder="Description"
              value={eDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-2 pb-12 py-3 mb-2 focus:border-2 focus:border-white focus:outline-none rounded-md"
            />
            {errors.description && (
              <Text color="crimson">{errors.description.message}</Text>
            )}
          </div>
          <Button type="submit">Create Goal</Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateNewGoal;
