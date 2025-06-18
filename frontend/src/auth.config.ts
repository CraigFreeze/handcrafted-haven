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
      // Attach user id and role to session if available
      if (user && user.id) {
        session.user = session.user || {};
        session.user.id = user.id;
        // @ts-expect-error: custom property
        session.user.role = (user as any).role;
      } else if (token && token.sub) {
        session.user = session.user || {};
        session.user.id = token.sub;
        // @ts-expect-error: custom property
        session.user.role = (token as any).role;
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
