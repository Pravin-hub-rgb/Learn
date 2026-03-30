import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, auth, signOut } = NextAuth({
  providers: [GitHub],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
});
