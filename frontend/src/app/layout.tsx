import { Inter } from "next/font/google";
import "./_styles/globals.css";

import type { Metadata } from "next";
import { ReactNode } from "react";
import { Session } from "next-auth";

import { Providers } from "./Providers";
import { DevToolbar } from "./_components";
import { isDev } from "./_utils/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyCommunity App",
  description: "Bringing communities together",
};

interface RootLayoutProps {
  children: ReactNode;
  Session: Session | null;
}

export default function RootLayout({ children, Session }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={Session}>{children}</Providers>
        {isDev && <DevToolbar />}
      </body>
    </html>
  );
}
