import { SegmentedControl, Text } from "@radix-ui/themes";

const GoalCategorySwap = ({ current, setCurrent }: any) => {
  return (
    <SegmentedControl.Root defaultValue={current} size="3">
      <SegmentedControl.Item
        onClick={() => setCurrent("current")}
        value="current"
      >
        <Text color="crimson">Current</Text>
      </SegmentedControl.Item>
      <SegmentedControl.Item
        value="completed"
        onClick={() => setCurrent("completed")}
      >
        <Text color="grass">Completed</Text>
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
};

export default GoalCategorySwap;
