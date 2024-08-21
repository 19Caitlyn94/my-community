import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./_styles/globals.css";

import { DevToolbar } from "./_components";
import { isDev } from "./_utils/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyCommunity App",
  description: "Bringing communities together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {isDev && <DevToolbar />}
      </body>
    </html>
  );
}
