import { Container, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import CreateNew from "./CreateNew";
import SessionAvatar from "./SessionAvatar";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <Container className="py-3 px-5 mb-20">
      <Flex align="center" justify="between">
        <Flex>
          <Heading className="hover:scale-110">
            <Link href="/">Logo</Link>
          </Heading>
        </Flex>
        <Flex gap="5" align="center" justify="center">
          <NavLinks />
          <CreateNew />
          <SessionAvatar />
        </Flex>
      </Flex>
    </Container>
  );
};
export default Navbar;
