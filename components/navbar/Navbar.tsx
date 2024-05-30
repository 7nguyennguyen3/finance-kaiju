"use client";
import { Container, Flex } from "@radix-ui/themes";
import Image from "next/image";
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
          <Link href="/" className="hover:scale-110 bg-white rounded-xl p-2">
            <Image
              src="/kaiju-logo.png"
              alt="Logo Icon"
              width={60}
              height={100}
            />
          </Link>
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
