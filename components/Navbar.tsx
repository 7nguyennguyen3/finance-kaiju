"use client";
import { Box, Button, Container, Flex, Text } from "@radix-ui/themes";
import Logo from "@/public/Elk.png";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Current", href: "/goal" },
    { label: "Completed", href: "/completed" },
  ];

  return (
    <Container className="bg-slate-100">
      <Flex align="center" justify="between" className=" w-full px-5 py-2">
        <Flex align="center" gap="5">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={45} />
          </Link>
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={classNames({
                "text-indigo-500 font-semibold": link.href === currentPath,
              })}
            >
              {link.label}
            </Link>
          ))}
        </Flex>
        <Link href="/new-goal">
          <Button>New Goal</Button>
        </Link>
      </Flex>
    </Container>
  );
};
<Flex></Flex>;

export default Navbar;
