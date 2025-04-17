import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL, isDev } from "@/app/_utils";
import { JWT } from "next-auth/jwt";
import NextAuth, { type Session } from "next-auth"
import { redirect } from "next/navigation";

type BackendResponse = {
  access: string;
  refresh: string;
  user: Session["user"];
  id?: string;
} | undefined;

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

// TODO: Salt and hash password
// TODO: Add OAuth providers

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const registerUser = async (email: string, password: string, community_code: string) => {
  try {
    const data = await fetch(`${BACKEND_URL}api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password1: password, password2: password, community_code: community_code }),
    })
    const user = await data.json()
    return user
  } catch (error) {
    console.error('Error fetching user: ', error);
  }
  return null
}

const refreshUserToken = async (token: JWT) => {
  try {
    const response = await fetch(`${BACKEND_URL}api/auth/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });

    const res = await response.json()

    if (res.data) {
      token["accessToken"] = res.data.access;
      token["refreshToken"] = res.data.refresh;
      token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
    } else {
      console.error("Token refresh failed:", res);
      delete token.accessToken;
      delete token.refreshToken;
    }

    return token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // On error, clear tokens to force re-login
    delete token.accessToken;
    delete token.refreshToken;

    // If we fail to refresh the token, return an error so we can handle it on the page
    token.error = "RefreshTokenError"
    redirect('/login')
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  debug: isDev,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // The data returned from this function is passed forward as the
      // `user` variable to the signIn() and jwt() callback
      async authorize(credentials) {
        const response = await fetch(`${BACKEND_URL}api/auth/login/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })
        const res = await response.json()
        // TODO return error message from backend
        if (!response.ok) return { error: res.error }
        return (res ?? null)
      },
    }),
  ],
  callbacks: {
    signIn() {
      return true // because we're only using credentials for now
    },
    jwt({ user, token, account }) {
      // If `user` and `account` are set that means it is a login event
      if (user && account) {
        let backendResponse: BackendResponse;
        if (account.provider === "credentials") {
          backendResponse = user as unknown as BackendResponse;
        } else {
          backendResponse = account.meta as BackendResponse;
        }

        token.user = backendResponse?.user;
        token.accessToken = backendResponse?.access;
        token.refreshToken = backendResponse?.refresh;
        token.ref = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
        return token;
      }

      // Refresh the backend token if necessary
      if (getCurrentEpochTime() > (token?.ref as number)) {
        return refreshUserToken(token)
      }

      return token;
    },
    // Since we're using Django as the backend we have to pass the JWT
    // token to the client instead of the `session`.
    session({ token }) {
      return {
        ...token,
        expires: new Date(Date.now() + BACKEND_ACCESS_TOKEN_LIFETIME * 1000).toISOString()
      } as Session;
    },
  },
  // This points the pages that need auth to the custom login page
  pages: {
    signIn: '/login'
  }
})