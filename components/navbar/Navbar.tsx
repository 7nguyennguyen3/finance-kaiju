"use client";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  HoverCard,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import styles from "./navbar.module.css";

const Navbar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const closeMenu = () => {
    return setOpen(!open);
  };

  const links = [
    { label: "Current", href: "/goal" },
    { label: "Completed", href: "/completed" },
    { label: "Task List", href: "/task" },
  ];

  const mobileLinks = [
    { label: "Home", href: "/" },
    ...links,
    { label: "New Task", href: "/create-task" },
    { label: "New Goal", href: "/new-goal" },
  ];

  return (
    <Container className="py-3 px-5 mb-20">
      <Flex align="center" justify="between">
        <Flex>
          <Heading>
            <Link href="/">Logo</Link>
          </Heading>
        </Flex>
        <Flex gap="5" align="center" justify="center">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={classNames({
                "text-indigo-500 font-semibold": link.href === currentPath,
                "hide-on-mobile": true,
                "hover:text-indigo-300 hover:scale-110": true,
              })}
            >
              {link.label}
            </Link>
          ))}
          <Box display={{ initial: "none", sm: "block" }}>
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Flex align="center" className="hover:scale-110">
                  <Text>Create </Text>
                  <IoIosArrowDown />
                </Flex>
              </HoverCard.Trigger>
              <HoverCard.Content className="w-56">
                <Flex direction="column" gap="4">
                  <Link href="/create-task">
                    <button
                      color="crimson"
                      className="font-light hover:scale-110 py-1 border-red-200 border w-full text-violet-100 rounded-md"
                    >
                      New Task
                    </button>
                  </Link>
                  <Link href="/new-goal">
                    <button className="font-light hover:scale-110 py-1 border-violet-200 border w-full text-violet-100 rounded-md">
                      New Goal
                    </button>
                  </Link>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          </Box>

          <Box display={{ xs: "inline", sm: "none" }}>
            <button onClick={closeMenu}>
              <FiMenu size={35} />
            </button>
            {open && (
              <>
                <div className={styles.mobileLinks}>
                  <button
                    className="flex flex-row-reverse pr-5"
                    onClick={closeMenu}
                  >
                    <IoClose size="30" />
                  </button>
                  {mobileLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={classNames({
                        "text-indigo-500 font-semibold ":
                          link.href === currentPath,
                        "text-lg ": true,
                      })}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </Box>

          {status === "unauthenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button className="pb-2">
                  <FaRegUserCircle size="26" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56" align="center">
                <Flex
                  gap="3"
                  className="p-2"
                  justify="center"
                  direction="column"
                >
                  <Text size="2" align="center">
                    Already have an account?
                  </Text>
                  <Link href="/sign-in" className="w-full">
                    <button className="font-light hover:scale-110 py-1 border-violet-400 border w-full text-violet-100 rounded-md">
                      Sign In
                    </button>
                  </Link>
                </Flex>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <div className="px-1">
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    radius="full"
                    size="2"
                  />
                </div>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56" align="center">
                <Flex direction="column" gap="3" className="p-2">
                  <Text size="2" align="center">
                    {session.user?.email}
                  </Text>

                  <Link href="/sign-out">
                    <button
                      onClick={() => {
                        signOut({
                          callbackUrl:
                            "https://goal-tracker-nine-iota.vercel.app/sign-out",
                        });
                      }}
                      className="font-light hover:scale-110 py-1 border-red-200 border w-full text-violet-100 rounded-md"
                    >
                      Sign Out
                    </button>
                  </Link>
                </Flex>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};
export default Navbar;
