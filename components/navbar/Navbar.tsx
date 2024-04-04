"use client";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxDragHandleHorizontal } from "react-icons/rx";
import styles from "./navbar.module.css";
import closeIcon from "@/public/Google Close Icon.png";

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
    { label: "New Goal", href: "/create-task" },
    { label: "New Task", href: "/new-goal" },
  ];

  return (
    <Container className="bg-slate-100">
      <Flex align="center" justify="between" className=" w-full px-5 py-2">
        <Flex>
          <Heading>Logo</Heading>
        </Flex>
        <Flex gap="5" align="center">
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
                <RxDragHandleHorizontal size="50" />
              </button>
              {open && (
                <>
                  <div className={styles.mobileLinks}>
                    <button
                      className="flex flex-row-reverse pr-5"
                      onClick={closeMenu}
                    >
                      <Image alt="close icon" src={closeIcon} width={30} />
                    </button>
                    {links.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={classNames({
                          "text-indigo-500 font-semibold ":
                            link.href === currentPath,
                          "text-xl ": true,
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
