import { CATEGORY } from "@prisma/client";
import { Text, Flex, Popover } from "@radix-ui/themes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterOption = CATEGORY | "ALL";

const FilterTransaction = ({ setFilter }: any) => {
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <Flex
          onClick={() => setOpenPopover(!openPopover)}
          className="px-3 rounded-md border border-slate-300 self-start hover:scale-110"
          align="center"
          gap="2"
        >
          <button className="hover:scale-100">Sort</button>
          {!openPopover && <FaChevronDown />}
          {openPopover && <FaChevronUp />}
        </Flex>
      </Popover.Trigger>
      <Popover.Content align="center">
        <Popover.Close>
          <Flex direction="column">
            {["ALL", ...Object.values(CATEGORY)].map((category) => (
              <Flex
                onClick={() => {
                  setFilter(category as FilterOption);
                  setOpenPopover(false);
                }}
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
  );
};

export default FilterTransaction;
