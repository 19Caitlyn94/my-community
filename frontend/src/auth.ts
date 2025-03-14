import Credentials from "next-auth/providers/credentials";
import { BACKEND_URL, isDev } from "@/app/_utils";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth"

// These two values should be a bit less than actual token lifetimes
const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

export const registerUser = async (email: string, password: string) => {
  try {
    const data = await fetch(`${BACKEND_URL}api/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password1: password, password2: password }),
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
    const data = await fetch(`${BACKEND_URL}api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refresh: token["refresh_token"],
      }),
    })
    const res = await data.json()
    token["access_token"] = res.data.access;
    token["refresh_token"] = res.data.refresh;
    token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
    return token
  }
  catch (error) {
    console.error('Error refreshing user token: ', error);
  }
  return null
}

const SIGN_IN_HANDLERS = {
  credentials: async (user, account, profile, email, credentials) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const providers = [
  Credentials({
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    // The data returned from this function is passed forward as the
    // `user` variable to the signIn() and jwt() callback
    async authorize(credentials, req) {
      const response = await fetch(`${BACKEND_URL}api/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      if (!response.ok) return null
      return (await response.json()) ?? null
    },
  }),
]

const callbacks = {
  async signIn({ user, account, profile, email, credentials }) {
    if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
    return SIGN_IN_HANDLERS[account.provider](
      user,
      account,
      profile,
      email,
      credentials
    );
  },
  async jwt({ user, token, account }) {
    // If `user` and `account` are set that means it is a login event
    if (user && account) {
      let backendResponse =
        account.provider === "credentials" ? user : account.meta;
      token["user"] = backendResponse.user;
      token["access_token"] = backendResponse.access;
      token["refresh_token"] = backendResponse.refresh;
      token["ref"] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
      return token;
    }
    // Refresh the backend token if necessary
    if (getCurrentEpochTime() > token["ref"]) {
      return await refreshUserToken(token)
    }
    return token;
  },
  // Since we're using Django as the backend we have to pass the JWT
  // token to the client instead of the `session`.
  async session({ token }) {
    return token;
  },
}


export const { auth, handlers, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  debug: isDev,
  session: {
    strategy: "jwt",
    maxAge: BACKEND_REFRESH_TOKEN_LIFETIME,
  },
  providers,
  callbacks,
  // This points the pages that need auth to the custom login page
  pages: {
    signIn: '/login'
  }
})