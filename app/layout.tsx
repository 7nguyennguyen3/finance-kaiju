import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { constructMetadata } from "@/components/utils";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Roboto } from "next/font/google";
import AuthProvider from "./(auth)/Provider";
import "./globals.css";
import QueryClientProvider from "./QueryClientProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

export const metadata = constructMetadata();

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
                <Footer />
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
