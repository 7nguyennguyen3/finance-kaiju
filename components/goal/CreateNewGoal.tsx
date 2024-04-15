import { goalSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { GoGoal } from "react-icons/go";
import { PiPlant } from "react-icons/pi";
import { z } from "zod";

type GoalValidation = z.infer<typeof goalSchema>;

const CreateNewGoal = ({ goalToast }: any) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalValidation>({ resolver: zodResolver(goalSchema) });

  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: () => {
      return axios.post("/api/goal", {
        title: title,
        description: description,
      });
    },
    onSuccess: () => {
      goalToast("⭐ Goal Created!");
      queryClient.invalidateQueries();
    },
  });

  return (
    <Flex>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button className="text-[34px] ml-auto hover:scale-110">
            <GoGoal />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="center" className="w-[280px] px-2 py-1">
          <form onSubmit={handleSubmit(() => createMutation.mutate())}>
            <Flex direction="column" gap="3" align="center">
              <Heading size="3" align="center" color="blue">
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
              <button
                className="btn-form border-blue-400 w-[95%]"
                type="submit"
              >
                <Flex align="center" justify="center" gap="2">
                  Create Goal
                  <PiPlant />
                </Flex>
              </button>
            </Flex>
          </form>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default CreateNewGoal;
