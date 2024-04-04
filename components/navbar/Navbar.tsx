"use client";
import closeIcon from "@/public/Google Close Icon.png";
import { Button, Container, Flex, Heading, Separator } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxDragHandleHorizontal } from "react-icons/rx";
import styles from "./navbar.module.css";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const currentPath = usePathname();
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
                "hover:text-indigo-300": true,
              })}
            >
              {link.label}
            </Link>
          ))}

          <Link href="/create-task" className="hide-on-mobile">
            <Button color="crimson">New Task</Button>
          </Link>
          <Link href="/new-goal" className="hide-on-mobile">
            <Button>New Goal</Button>
          </Link>
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
        </Flex>
      </Flex>
    </Container>
  );
};
<Flex></Flex>;

export default Navbar;
