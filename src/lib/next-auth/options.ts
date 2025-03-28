import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../prisma";
export const nextAuthOptions: NextAuthOptions = {
  debug: false,
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60,
    updateAge: 6 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signin`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === "signIn") {
        if (user) {
          token.sub = user.id;
          token.name = user.name;
          token.email = user.email;
          token.emailVerified = user.emailVerified ? user.emailVerified : null;
        }
        if (token) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub as string },
          });
          if (dbUser) {
            token.emailVerified = dbUser.emailVerified;
          }
        }
        token.jat = Math.floor(Date.now() / 1000);
      }
      if (trigger === "update" && session?.fridgeId) {
        token.fridgeId = session.fridgeId;
      }
      // JWT 更新時にtoken.fridgeId を保持
      if (!token.fridgeId && session?.user?.fridgeId) {
        token.fridgeId = session.user.fridgeId;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (!session.user) return session;
      session.user.id = token.sub ? token.sub : "";
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.emailVerified = token.emailVerified as Date | null;
      session.user.fridgeId = token.fridgeId as string;
      return session;
    },
  },
};
