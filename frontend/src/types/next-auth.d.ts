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
    /**
   * By default, TypeScript merges new interface properties and overwrites existing ones.
   * In this case, the default session user properties will be overwritten,
   * with the new ones defined above. To keep the default session user properties,
   * you need to add them back into the newly declared interface.
   */
  }
}
