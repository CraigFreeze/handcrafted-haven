import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfile = nextUrl.pathname.startsWith("/profile");
      if (isOnProfile) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/profile", nextUrl));
      }
      return true;
    },
    async session({ session, token, user }) {
      // Attach user id to session if available
      if (user && user.id) {
        session.user = session.user || {};
        session.user.id = user.id;
      } else if (token && token.sub) {
        session.user = session.user || {};
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
