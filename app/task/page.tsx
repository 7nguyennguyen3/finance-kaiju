import { Container } from "@radix-ui/themes";
import ShowTask from "./ShowTask";
import FlexBar from "@/components/FlexBar";
import CreateTask from "./CreateTask";

const DailyTaskPage = () => {
  return (
    <Container>
      <FlexBar gap="3">
        <CreateTask />
        <ShowTask />
      </FlexBar>
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default DailyTaskPage;
