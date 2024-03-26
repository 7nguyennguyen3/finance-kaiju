"use client";
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import Logo from "@/public/Elk.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <Container className="bg-slate-100">
      <Flex align="center" justify="between" className=" w-full px-5 py-2">
        <Flex align="center" gap="5">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={45} />
          </Link>
          <Link href="/">
            <Text size="5" className="hoverEffects">
              Goals
            </Text>
          </Link>
        </Flex>
        <Button>New Goal</Button>
      </Flex>
    </Container>
  );
};
<Flex></Flex>;

export default Navbar;
