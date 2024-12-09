import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./_styles/globals.css";

import { getSession } from "@/auth";
import type { Metadata } from "next";

import Providers from "./Providers";
import { DevToolbar, Navbar } from "./_components";

import { isDev } from "./_utils/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyCommunity App",
  description: "Bringing communities together",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers session={session}>
          <Navbar />
          <>{children}</>
        </Providers>
        {isDev && <DevToolbar />}
      </body>
    </html>
  );
}
