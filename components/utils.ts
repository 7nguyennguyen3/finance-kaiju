import { Metadata } from "next";

export function constructMetadata({
  title = "Finance Kaiju - Personal Finance Management App",
  description = `Finance Kaiju is a personal finance management app that helps you track your 
    expenses, set financial goals, and manage your tasks.`,
  image = "/kaiju-logo.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons,
    metadataBase: new URL("https://casecobra.vercel.app/"),
  };
}
