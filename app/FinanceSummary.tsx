import { useFinanceRecords } from "@/components/hook";
import Loading from "./loading";
import { Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  userEmail: any;
  selectedMonth: any;
}

const FinanceSummary = ({ userEmail, selectedMonth }: Props) => {
  const { data: records, error, isLoading } = useFinanceRecords(userEmail!);

  isLoading && <Loading />;

  if (error) return null;

  const deposit =
    records
      ?.filter(
        (record) =>
          (record.category === "INCOME" || record.category === "PROFIT") &&
          new Date(record.date).toLocaleString("default", {
            month: "long",
          }) === selectedMonth
      )
      .reduce((total, record) => total + record.amount, 0)
      .toFixed(2) || "0.00";

  const expense =
    records
      ?.filter(
        (record) =>
          record.category !== "INCOME" &&
          record.category !== "PROFIT" &&
          new Date(record.date).toLocaleString("default", {
            month: "long",
          }) === selectedMonth
      )
      .reduce((total, record) => total + record.amount, 0)
      .toFixed(2) || "0.00";

  const balance = (parseFloat(deposit) - parseFloat(expense)).toFixed(2);

  const highExpenseRecord = records
    ?.filter(
      (record) => record.category !== "INCOME" && record.category !== "PROFIT"
    )
    .reduce(
      (max, record) => (record.amount > max.amount ? record : max),
      records[0]
    );

  return (
    <Flex
      justify="center"
      align="center"
      className="border-blue-pop-out rounded-lg"
      height={{ initial: "100%", xs: "400px", sm: "600px" }}
    >
      <Flex gap="5" direction="column" className="p-5" align="center">
        <text className="blue-sky-gradient font-bold text-3xl">
          {selectedMonth} Summary
        </text>
        <Heading color={balance < "0" ? "red" : "gray"}>
          Balance: ${balance}
        </Heading>
        <Text color="grass">Deposit: ${deposit}</Text>
        <Text color="crimson">Expense: ${expense}</Text>
        <Text color="crimson">
          Highest Expense: $
          {!highExpenseRecord ? "0.00" : highExpenseRecord?.amount}
        </Text>
        <Link href="/finance">
          <button className="p-5 border border-blue-400 rounded-md">
            Go to Finance
          </button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default FinanceSummary;
