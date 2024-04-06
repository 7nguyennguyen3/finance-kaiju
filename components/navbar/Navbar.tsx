"use client";
import {
  Avatar,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Heading,
  HoverCard,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RxDragHandleHorizontal } from "react-icons/rx";
import styles from "./navbar.module.css";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { data: session, status } = useSession();

  // Function to handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 720);
  };

  // Add event listener on component mount
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    <Container className=" py-3 px-5 mb-20">
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
          {!isMobile && (
            <HoverCard.Root>
              <HoverCard.Trigger>
                <Flex align="center" className="hover:scale-110">
                  <Text>Create </Text>
                  <IoIosArrowDown />
                </Flex>
              </HoverCard.Trigger>
              <HoverCard.Content size="3" className="w-56">
                <Flex direction="column" gap="4">
                  <Button
                    color="crimson"
                    variant="outline"
                    className="hover:scale-110 w-full"
                  >
                    <Link href="/create-task">New Task</Link>
                  </Button>
                  <Button className="hover:scale-110" variant="outline">
                    <Link href="/new-goal">New Goal</Link>
                  </Button>
                </Flex>
              </HoverCard.Content>
            </HoverCard.Root>
          )}

          {isMobile && (
            <>
              <button onClick={closeMenu}>
                <RxDragHandleHorizontal size="45" />
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
            </>
          )}

          {status === "unauthenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <button>
                  <FaRegUserCircle size={22} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56">
                <Flex
                  direction="column"
                  gap="3"
                  className="p-2"
                  justify="center"
                >
                  <Button variant="outline" className="hover:scale-110">
                    <Link href="/sign-in">Sign In</Link>
                  </Button>
                </Flex>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}

          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={session.user!.image!}
                  fallback="?"
                  radius="full"
                  size="2"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-56">
                <Flex direction="column" gap="3" className="p-2">
                  <Text size="2">{session.user?.email}</Text>

                  <Button
                    variant="outline"
                    color="crimson"
                    className="hover:scale-110"
                  >
                    <Link href="/sign-out" className="hide-on-mobile">
                      Sign Out
                    </Link>
                  </Button>
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
