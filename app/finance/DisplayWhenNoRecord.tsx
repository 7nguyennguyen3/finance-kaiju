import { Badge, Card, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";

const dummyData = [
  {
    id: 1,
    category: "Test",
    amount: 5,
  },
  {
    id: 2,
    category: "Test",
    amount: 5,
  },
  {
    id: 3,
    category: "Test",
    amount: 5,
  },
];

const DisplayWhenNoRecord = ({ records }: any) => {
  return (
    <>
      {records?.length === 0 &&
        dummyData.map((record) => (
          <Card
            variant="classic"
            key={record.id}
            className={classNames("hover:scale-105 overflow-clip")}
          >
            <Flex justify="between" align="center">
              <Text>${record.amount}</Text>
              <Flex align="center" gap="1">
                <Badge color="blue">{record.category}</Badge>
              </Flex>
            </Flex>
          </Card>
        ))}
    </>
  );
};

export default DisplayWhenNoRecord;
