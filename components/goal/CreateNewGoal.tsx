import { goalSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, Heading, Box, Button, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { GoGoal } from "react-icons/go";
import { z } from "zod";

type GoalValidation = z.infer<typeof goalSchema>;

const CreateNewGoal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalValidation>({ resolver: zodResolver(goalSchema) });

  return (
    <Flex>
      <Popover.Root>
        <Popover.Trigger>
          <button className="text-[34px] ml-auto hover:scale-110">
            <GoGoal />
          </button>
        </Popover.Trigger>
        <Popover.Content align="center" width="270px">
          <form
            onSubmit={handleSubmit(async () => {
              await axios.post("/api/goal", {
                title: title,
                description: description,
              });
              router.refresh();
            })}
          >
            <Flex direction="column" gap="3" align="center">
              <Heading size="3" align="center">
                Create New Goal!
              </Heading>
              <div className="w-full">
                <input
                  {...register("title")}
                  placeholder="Title of Goal"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-form"
                />
                {errors.title && (
                  <Box className="mt-2">
                    <Text color="crimson">{errors.title.message}</Text>
                  </Box>
                )}
              </div>
              <div className="w-full">
                <textarea
                  rows={4}
                  {...register("description")}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input-form"
                />
                {errors.description && (
                  <Text color="crimson">{errors.description.message}</Text>
                )}
              </div>
              <Button variant="outline" type="submit">
                Create Goal
              </Button>
            </Flex>
          </form>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default CreateNewGoal;
