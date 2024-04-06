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
    { label: "New Goal", href: "/create-task" },
    { label: "New Task", href: "/new-goal" },
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
              <HoverCard.Content size="3">
                <Flex direction="column" gap="4">
                  <Link href="/create-task">
                    <Button color="crimson" className="hover:scale-110">
                      New Task
                    </Button>
                  </Link>
                  <Link href="/new-goal">
                    <Button className="hover:scale-110">New Goal</Button>
                  </Link>
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
                      {/* <Image alt="close icon" src={closeIcon} width={30} /> */}
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
              <DropdownMenu.Content>
                <Flex direction="column" gap="2" className="p-2">
                  <Text size="2">Sign in with google</Text>
                  <Link href="/api/auth/signout">
                    <Button
                      size="1"
                      variant="outline"
                      className="hover:scale-110"
                    >
                      Sign In
                    </Button>
                  </Link>
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
              <DropdownMenu.Content>
                <Flex direction="column" gap="2" className="p-2">
                  <Text size="2">{session.user?.email}</Text>
                  <Link href="/api/auth/signout" className="hide-on-mobile">
                    <Button
                      size="1"
                      variant="outline"
                      color="crimson"
                      className="hover:scale-110"
                    >
                      Sign Out
                    </Button>
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
