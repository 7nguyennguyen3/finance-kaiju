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

export const dummyMessages = [
  "Hello how can I assist you?",
  "What is Stoicism and who is Marcus Aurelius?",
  "Stoicism is a school of philosophy that originated in ancient Greece, which teaches the development of self-control and fortitude as a means of overcoming destructive emotions. It emphasizes rationality, virtue, and living in accordance with nature. Marcus Aurelius was a Roman Emperor who ruled from 161 to 180 AD. He is considered one of the most important Stoic philosophers and is known for his work 'Meditations, ' which is a collection of personal writings that reflect his Stoic beliefs and practices. Marcus Aurelius is often revered for his wisdom, humility, and commitment to living a virtuous life.",
  "What were we talking about?",
  "You asked about Stoicism and Marcus Aurelius. Is there anything else you would like to know or discuss?",
];

export const homepageDummyGoals = [
  {
    id: 1,
    title: "Exercise",
    description: "Do 5 push ups!",
    status: "INCOMPLETE",
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: "Sleep Routine",
    description: "Work to go to sleep and wake up at similar time every day!",
    status: "INCOMPLETE",
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: "Travel to a new Country",
    description: "Travel to a new country once every year or two.",
    status: "COMPLETE",
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: "Learn to swim",
    description: "Able to float on water and swim at least 1 lap.",
    status: "COMPLETE",
    updatedAt: new Date(),
  },
];
