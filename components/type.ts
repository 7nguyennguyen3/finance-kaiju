import { CATEGORY } from "@prisma/client";

export type RadixUIColor =
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky";

export const categoryColors: Record<CATEGORY, RadixUIColor> = {
  FOOD: "sky",
  ENTERTAINMENT: "indigo",
  GIFT: "blue",
  TRANSPORTATION: "gray",
  UTILITIES: "gold",
  HOUSING: "bronze",
  EDUCATION: "brown",
  MISCELLANEOUS: "yellow",
  INCOME: "amber",
  PROFIT: "orange",
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
