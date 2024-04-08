"use client";
import { Box } from "@radix-ui/themes";
import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";

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

const NavLinks = () => {
  const [open, setOpen] = useState(false);
  const currentPath = usePathname();

  const closeMenu = () => {
    return setOpen(!open);
  };

  return (
    <>
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
                    "text-indigo-500 font-semibold ": link.href === currentPath,
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
    </>
  );
};

export default NavLinks;
