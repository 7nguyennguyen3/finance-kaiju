import Navbar from "@/components/navbar/Navbar";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Goal Tracker",
  description: "An app to track your goals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="violet" appearance="dark">
          <main className={roboto.className}>
            <Navbar />
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}
