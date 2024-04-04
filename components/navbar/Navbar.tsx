"use client";
import { Button, Container, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RxDragHandleHorizontal } from "react-icons/rx";
import styles from "./navbar.module.css";

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

  const links = [
    { label: "Current", href: "/goal" },
    { label: "Completed", href: "/completed" },
    { label: "Task List", href: "/task" },
  ];

  return (
    <Container className="bg-slate-100">
      <Flex align="center" justify="between" className=" w-full px-5 py-2">
        <Flex>
          <Link href="/">
            <Image src="/pixel-cat.gif" alt="Logo" width={80} height={10} />
          </Link>
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
              <button onClick={() => setOpen((prev) => !prev)}>
                <RxDragHandleHorizontal size="50" />
              </button>
              {open && (
                <div className={styles.mobileLinks}>
                  {links.map((link) => (
                    <button
                      className="border-b-4 border-rose-300 p-2 rounded-md bg-slate-200 hover:bg-slate-300 w-40 transition ease-in-out delay-150 hover:scale-110"
                      key={link.label}
                    >
                      <Link
                        key={link.label}
                        href={link.href}
                        className={classNames({
                          "text-indigo-500 font-semibold ":
                            link.href === currentPath,
                          "text-xl ": true,
                        })}
                      >
                        {link.label}
                      </Link>
                    </button>
                  ))}
                  <Link href="/create-task">
                    <Button color="crimson" size="4">
                      New Task
                    </Button>
                  </Link>
                  <Link href="/new-goal">
                    <Button className="w-80" size="4">
                      New Goal
                    </Button>
                  </Link>
                </div>
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
