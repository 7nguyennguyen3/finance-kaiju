"use client";
import { useFinanceRecords } from "@/components/hook";
import { categoryColors } from "@/components/type";
import { CATEGORY, Finance } from "@prisma/client";
import { Badge, Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdOutlineFiberNew } from "react-icons/md";
import DisplayWhenNoRecord from "./DisplayWhenNoRecord";
import FilterTransaction from "./FilterTransaction";
import UpdateRecord from "./UpdateRecord";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../loading";

type FilterOption = CATEGORY | "ALL";

const ShowFinance = () => {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  const [init, setInit] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  let n1 = init + 8;
  const { data: records, error, isLoading } = useFinanceRecords(userEmail!);

  const [filter, setFilter] = useState<FilterOption>("ALL");
  const [selectedMonth, setSelectedMonth] = useState("All");

  const [showDiv, setShowDiv] = useState(false);
  const [patchRecord, setPatchRecord] = useState<Finance>();

  useEffect(() => {
    setInit(0);
    setCurrentPage(1);
  }, [filter]);

  if (!userEmail) return null;

  isLoading && <Loading />;

  const notifyGoalupdated = (message: string) =>
    toast(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

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
        (record) =>
          record.category === "INCOME" ||
          (record.category === "PROFIT" &&
            new Date(record.date).toLocaleString("default", {
              month: "long",
            }) === "January")
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

  const FinanceInfo = ({ display }: any) => {
    const noRecords = records && records.length === 0;

    return (
      <Flex
        className="p-5 border-2 rounded-md"
        display={display}
        direction="column"
      >
        <Heading>{noRecords ? "Balance: $-15" : `Balance: ${balance}`}</Heading>
        <Text className="font-semibold" size="4">
          Deposit: ${deposit}
        </Text>
        <Text className="font-semibold" size="4">
          {noRecords ? "Expense: $15" : `Expense: ${expense}`}
        </Text>
        <Text>
          {noRecords
            ? "Total Expense Transaction: 3"
            : `Total Expense Transaction: ${expenseNum}`}
        </Text>
      </Flex>
    );
  };

  return (
    <Flex direction="column">
      <FinanceInfo display={{ initial: "flex", sm: "none" }} />
      <Grid columns={{ initial: "1", sm: "35fr 65fr" }}>
        <FinanceInfo display={{ initial: "none", sm: "flex" }} />
        <Box height="570px" className="border-2 rounded-md">
          <Grid
            columns="1fr 8fr 1fr"
            className="py-5"
            justify="center"
            height="100%"
          >
            <button
              className="m-auto hover:scale-110"
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
            <Flex direction="column" gap="2" className="relative">
              <Text>Transaction Summary</Text>
              <Flex justify="between" align="center">
                <FilterTransaction
                  setFilter={setFilter}
                  filter={filter}
                  setSelectedMonth={setSelectedMonth}
                  selectedMonth={selectedMonth}
                />
                <Text>
                  {pageCount === 1 ? 1 : currentPage}/
                  {pageCount === 0 ? 1 : pageCount}
                </Text>
              </Flex>
              <DisplayWhenNoRecord records={records} />
              {records?.length === 0 && (
                <Heading align="center" color="indigo">
                  Add a record to remove test data!
                </Heading>
              )}
              {records
                ?.filter(
                  (record) =>
                    (filter === "ALL" || record.category === filter) &&
                    (selectedMonth === "All" ||
                      selectedMonth ===
                        new Date(record.date).toLocaleString("default", {
                          month: "long",
                        }))
                )
                .slice(pageCount === 1 ? 0 : init, n1)
                .map((record) => (
                  <Card
                    onClick={() => {
                      setShowDiv(true);
                      setPatchRecord(record);
                      console.log(
                        new Date(record.date).toLocaleString("default", {
                          month: "long",
                        })
                      );
                    }}
                    variant="classic"
                    key={record.id}
                    className={classNames(
                      "hover:scale-105 overflow-clip relative hover:border",
                      {
                        "bg-slate-900": record.id === maxIdRecord?.id,
                      }
                    )}
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
              {showDiv && (
                <UpdateRecord
                  patchRecord={patchRecord}
                  setShowDiv={setShowDiv}
                  updateToast={notifyGoalupdated}
                />
              )}
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
