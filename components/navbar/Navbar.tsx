"use client";
import { Container, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import NavLinks from "./NavLinks";
import SessionAvatar from "./SessionAvatar";

const Navbar = () => {
  const isMobile = useMediaQuery({
    query: "(min-width: 520px)",
  });
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
          <SessionAvatar />
        </Flex>
      </Flex>
    </Container>
  );
};
export default Navbar;
