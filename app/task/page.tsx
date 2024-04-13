import { Container } from "@radix-ui/themes";
import ShowTask from "./ShowTask";

const DailyTaskPage = () => {
  return (
    <Container>
      <ShowTask />
    </Container>
  );
};

export const dynamic = "force-dynamic";

export default DailyTaskPage;
