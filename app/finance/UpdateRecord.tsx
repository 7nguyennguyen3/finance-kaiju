import { CATEGORY, Finance } from "@prisma/client";
import { Flex, Popover, Text } from "@radix-ui/themes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import classNames from "classnames";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  setShowDiv: any;
  patchRecord: any;
  updateToast: any;
}

const UpdateRecord = ({ setShowDiv, patchRecord, updateToast }: Props) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: () => {
      return axios.patch<Finance[]>("api/finance", {
        id: patchRecord.id,
        amount,
        category,
      });
    },
    onSuccess: () => {
      updateToast("⭐ Record Updated");
      queryClient.invalidateQueries();
    },
  });
  const deleteMutation = useMutation({
    mutationFn: () => {
      return axios.delete<Finance[]>("api/finance", {
        data: { id: patchRecord.id },
      });
    },
    onSuccess: () => {
      updateToast("🗑️ Record Deleted");
      queryClient.invalidateQueries();
    },
  });

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      className="absolute mx-auto max-w-[300px] max-h-[400px] h-[90vh] w-[90vw] 
      bottom-0 right-0 bg-black border"
    >
      <button
        className="top-5 right-5 absolute"
        onClick={() => setShowDiv(false)}
      >
        <IoClose size={30} />
      </button>
      <Flex direction="column" gap="3">
        <Text>Previous Amount: ${patchRecord.amount}</Text>
        <Text>Previous Category: {patchRecord.category}</Text>
        <input
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          type="number"
          min="0"
          step="0.01"
          placeholder="New Amount"
          className="hover:scale-110 p-3 rounded-md bg-transparent border 
  border-violet-200 focus:outline-none focus:border-2"
        />

        <Popover.Root>
          <Popover.Trigger>
            <Flex
              className="px-3 rounded-md border border-slate-300 self-start hover:scale-110 w-full"
              align="center"
              justify="center"
              gap="2"
            >
              <text className="hover:scale-100 bg-transparent p-2">
                {category === "" ? "Select Category" : category}
              </text>
            </Flex>
          </Popover.Trigger>
          <Popover.Content align="center">
            <Popover.Close>
              <Flex direction="column">
                {[...Object.values(CATEGORY)].map((category) => (
                  <Flex
                    onClick={() => setCategory(category)}
                    key={category}
                    direction="column"
                    className="border border-slate-300 mb-[6px] rounded-md px-3 py-[2px] hover:bg-slate-500"
                  >
                    {category.charAt(0) + category.toLocaleLowerCase().slice(1)}
                  </Flex>
                ))}
              </Flex>
            </Popover.Close>
          </Popover.Content>
        </Popover.Root>
        <button
          type="button"
          disabled={amount === 0 || isLoading || category === ""}
          className={classNames({
            "btn-form border-violet-400": true,
            "opacity-50 cursor-not-allowed hover:scale-100":
              amount === 0 || isLoading || category === "",
          })}
          onClick={() => {
            try {
              setIsLoading(true);
              updateMutation.mutate();
              setIsLoading(false);
              setShowDiv(false);
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
        >
          Submit
        </button>
        <button
          className="btn-form border-red-400 mt-5"
          onClick={() => {
            try {
              setIsLoading(true);
              deleteMutation.mutate();
              setIsLoading(false);
              setShowDiv(false);
            } catch (error) {
              console.log(error);
              setIsLoading(false);
            }
          }}
        >
          Delete Record
        </button>
      </Flex>
    </Flex>
  );
};

export default UpdateRecord;
