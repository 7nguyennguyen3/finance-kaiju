import { GOAL } from "@prisma/client";
import {
  Badge,
  Blockquote,
  Box,
  Flex,
  Separator,
  Text,
} from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { IoIosCheckmark, IoIosClose, IoIosTrash } from "react-icons/io";

const GoalCard = ({ goal, color, goalToast }: any) => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: () => {
      return axios.patch<GOAL[]>("api/goal", {
        id: goal.id,
        status: goal.status === "COMPLETE" ? "INCOMPLETE" : "COMPLETE",
      });
    },
    onSuccess: () => {
      goalToast("⭐ Goal Updated");
      queryClient.invalidateQueries();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete<GOAL[]>("api/goal", {
        data: {
          id: goal.id,
        },
      });
    },
    onSuccess: () => {
      goalToast("🗑️ Goal Deleted");
      queryClient.invalidateQueries();
    },
  });

  return (
    <Box
      key={goal.id}
      className={classNames("mx-2 relative w-full p-5 rounded-xl", {
        "border border-blue-400": goal.status === "INCOMPLETE",
        "border border-emerald-200": goal.status === "COMPLETE",
      })}
    >
      <Flex justify="between">
        <Flex align="center" gap="2">
          <Text className="font-semibold text-violet-300">{goal.title}</Text>
        </Flex>

        <Flex align="center" gap="1">
          <Badge color={color}>{goal.status}</Badge>
          <IoIosTrash
            onClick={() => deleteMutation.mutate()}
            className="text-[20px] hover:scale-150"
          />
        </Flex>
      </Flex>
      <Separator my="2" size="4" />
      <Blockquote className="font-normal p-3">{goal.description}</Blockquote>
      <Separator my="2" size="4" />
      <Flex justify="between" align="center">
        <Text
          size="2"
          color="violet"
          align="center"
          weight="light"
          highContrast
        >
          {new Date(goal.updatedAt).toLocaleDateString()}
        </Text>
        {goal.status === "COMPLETE" ? (
          <IoIosClose
            onClick={() => updateMutation.mutate()}
            className="text-[40px] hover:scale-150"
          />
        ) : (
          <IoIosCheckmark
            onClick={() => updateMutation.mutate()}
            className="text-[40px] hover:scale-150"
          />
        )}
      </Flex>
    </Box>
  );
};

export default GoalCard;
