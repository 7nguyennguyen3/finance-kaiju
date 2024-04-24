"use client";
import logo from "@/public/logo-no-background.png";
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
          <Link href="/" className="hover:scale-110">
            <Image src={logo} alt="Logo Icon" width={100} />
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
