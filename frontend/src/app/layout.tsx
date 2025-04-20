import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./_styles/globals.css";

import { auth } from "@/auth";
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
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers session={session}>
          <Navbar />
          <div className="grid grid-cols-12 lg:gap-10">
            <div>{/* Left Sidebar */}</div>
            <div className="col-start-2 col-end-12 lg:col-start-5 lg:col-end-9">
              {children}
            </div>
            <div>{/* Right Sidebar */}</div>
          </div>
        </Providers>
        {isDev && <DevToolbar />}
      </body>
    </html>
  );
}
