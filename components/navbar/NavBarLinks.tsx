import React from "react";

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

const NavBarLinks = () => {
  return <div>NavBarLinks</div>;
};

export default NavBarLinks;
