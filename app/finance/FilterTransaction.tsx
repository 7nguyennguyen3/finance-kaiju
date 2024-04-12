import { CATEGORY } from "@prisma/client";
import { Flex, Popover } from "@radix-ui/themes";
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
          className="px-3 rounded-md border self-start hover:scale-110"
          align="center"
          gap="2"
        >
          <button className="hover:scale-100">Sort</button>
          {!openPopover && <FaChevronDown />}
          {openPopover && <FaChevronUp />}
        </Flex>
      </Popover.Trigger>
      <Popover.Content align="center">
        <select
          className="p-3 rounded-md bg-transparent border 
                  border-blue-200 focus:outline-none focus:border-2"
          onChange={(e) =>
            setFilter(e.target.value.toUpperCase() as FilterOption)
          }
        >
          {["ALL", ...Object.values(CATEGORY)].map((category) => (
            <option key={category} className="bg-black hover:text-red-200">
              {category.charAt(0) + category.toLocaleLowerCase().slice(1)}
            </option>
          ))}
        </select>
      </Popover.Content>
    </Popover.Root>
  );
};

export default FilterTransaction;
