"use client";
import { useFinanceRecords } from "@/components/hook";
import { categoryColors } from "@/components/type";
import { CATEGORY } from "@prisma/client";
import {
  Badge,
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";
import FilterTransaction from "./FilterTransaction";

type FilterOption = CATEGORY | "ALL";

const ShowFinance = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [init, setInit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let n1 = init + 8;
  const { data: records, error } = useFinanceRecords(userEmail!);
  const [filter, setFilter] = useState<FilterOption>("ALL");

  useEffect(() => {
    setInit(0);
    setCurrentPage(1);
  }, [filter]);

  if (!userEmail) return null;

  if (status === "loading")
    return (
      <Text>
        Loading... <Spinner />
      </Text>
    );

  const filteredRecords = records?.filter(
    (record) => filter === "ALL" || record.category === filter
  );
  const pageCount = Math.ceil(filteredRecords?.length! / 8);
  const maxIdRecord = records?.reduce(
    (prev, current) => (prev.id > current.id ? prev : current),
    records[0]
  );

  if (error) return null;

  const deposit =
    records
      ?.filter(
        (record) => record.category === "INCOME" || record.category === "PROFIT"
      )
      .reduce((total, record) => total + record.amount, 0) || 0;

  const expense =
    records
      ?.filter(
        (record) => record.category !== "INCOME" && record.category !== "PROFIT"
      )
      .reduce((total, record) => total + record.amount, 0) || 0;

  const balance = deposit - expense;

  const expenseNum = records?.filter(
    (record) => record.category !== "INCOME" && record.category !== "PROFIT"
  ).length;

  return (
    <Flex direction="column">
      <Flex
        className="p-5 border rounded-md"
        display={{ initial: "flex", sm: "none" }}
        direction="column"
      >
        <Heading>Balance: ${balance}</Heading>
        <Text className="font-semibold" size="4">
          Deposit: ${deposit}
        </Text>
        <Text className="font-semibold" size="4">
          Expense: ${expense}
        </Text>
        <Text>Total Expense Transactions: {expenseNum}</Text>
      </Flex>
      <Grid columns={{ initial: "1", sm: "35fr 65fr" }}>
        <Flex
          className="p-5 border rounded-md"
          display={{ initial: "none", sm: "flex" }}
          direction="column"
        >
          <Heading>Balance: ${balance}</Heading>
          <Text className="font-semibold" size="4">
            Deposit: ${deposit}
          </Text>
          <Text className="font-semibold" size="4">
            Expense: ${expense}
          </Text>
          <Text size="3">Total Expense Transactions: {expenseNum}</Text>
        </Flex>
        <Box height="570px" className="border rounded-md">
          <Grid
            columns="1fr 8fr 1fr"
            className="py-5"
            justify="center"
            height="100%"
          >
            <button
              className="m-auto hover:scale-110 "
              onClick={() => {
                setCurrentPage(currentPage - 1);
                setInit(init - 8);
              }}
              disabled={init < 8}
            >
              <FaChevronLeft
                size="40"
                className={classNames({
                  hidden:
                    pageCount === 1 ||
                    currentPage === 1 ||
                    records?.length === 0,
                })}
              />
            </button>
            <Flex direction="column" gap="2">
              <Text>Transaction Summary</Text>
              <Flex justify="between" align="center">
                <FilterTransaction filter={filter} setFilter={setFilter} />
                <Text>
                  {pageCount === 1 ? 1 : currentPage}/
                  {pageCount === 0 ? 1 : pageCount}
                </Text>
              </Flex>

              {records
                ?.filter(
                  (record) => filter === "ALL" || record.category === filter
                )
                .slice(pageCount === 1 ? 0 : init, n1)
                .map((record) => (
                  <Card
                    variant="classic"
                    key="record"
                    className={classNames("hover:scale-105 overflow-clip", {
                      "bg-slate-900": record.id === maxIdRecord?.id,
                    })}
                  >
                    <Flex justify="between" align="center">
                      <Text>${record.amount}</Text>
                      <Flex align="center" gap="1">
                        <Badge color={categoryColors[record.category]}>
                          {record.category}
                        </Badge>

                        {record.id === maxIdRecord?.id && (
                          <MdOutlineFiberNew className="text-[30px]" />
                        )}
                      </Flex>
                    </Flex>
                  </Card>
                ))}
            </Flex>
            <button
              disabled={currentPage === pageCount}
              onClick={() => {
                setInit(init + 8);
                setCurrentPage(currentPage + 1);
              }}
              className="m-auto hover:scale-110  "
            >
              <FaChevronRight
                size="40"
                className={classNames({
                  hidden:
                    currentPage >= pageCount ||
                    !session ||
                    records?.length === 0,
                })}
              />
            </button>
          </Grid>
        </Box>
      </Grid>
    </Flex>
  );
};

export default ShowFinance;
