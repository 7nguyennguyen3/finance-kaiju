import ChatBot from "@/components/ChatBot";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import AuthProvider from "./(auth)/Provider";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";

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
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" appearance="dark">
              <main className={roboto.className}>
                <Navbar />
                {children}
                <ChatBot />
                <Footer />
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
