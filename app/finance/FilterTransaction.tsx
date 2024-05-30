import { CATEGORY } from "@prisma/client";
import { Flex, Popover } from "@radix-ui/themes";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

type FilterOption = CATEGORY | "ALL";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FilterTransaction = ({
  setFilter,
  filter,
  setSelectedMonth,
  selectedMonth,
}: any) => {
  const [openPopover, setOpenPopover] = useState(false);
  const [monthFilter, setMonthFilter] = useState(false);

  return (
    <Flex gap="2" direction={{ initial: "column", xs: "row" }}>
      <Popover.Root>
        <Popover.Trigger>
          <Flex
            onClick={() => setOpenPopover(!openPopover)}
            className="px-3 rounded-md border border-slate-300 self-start hover:scale-110"
            align="center"
            gap="2"
          >
            <button className="hover:scale-100">
              {filter === "ALL" ? "Sort" : filter}
            </button>
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
      <Popover.Root>
        <Popover.Trigger>
          <Flex
            onClick={() => setMonthFilter(!monthFilter)}
            className="px-3 rounded-md border border-slate-300 self-start hover:scale-110"
            align="center"
            gap="2"
          >
            <button className="hover:scale-100">
              {selectedMonth === "All" ? "Month" : selectedMonth}
            </button>
            {!monthFilter && <FaChevronDown />}
            {monthFilter && <FaChevronUp />}
          </Flex>
        </Popover.Trigger>
        <Popover.Content align="center">
          <Popover.Close>
            <Flex direction="column">
              {["All", ...months].map((month) => (
                <Flex
                  key={month}
                  onClick={() => {
                    setSelectedMonth(month);
                    console.log(selectedMonth);
                  }}
                  direction="column"
                  className="border border-slate-300 mb-[6px] rounded-md px-3 py-[2px] hover:bg-slate-500"
                >
                  {month}
                </Flex>
              ))}
            </Flex>
          </Popover.Close>
        </Popover.Content>
      </Popover.Root>
    </Flex>
  );
};

export default FilterTransaction;
