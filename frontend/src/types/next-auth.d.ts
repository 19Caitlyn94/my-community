import "next-auth";
import "next-auth/jwt";
import { UserExtended } from "./user";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    ref?: number;
    error?: string;
    user?: UserExtended & DefaultSession["user"]
  }
}
