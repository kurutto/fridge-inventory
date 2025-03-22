import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      emailVerified?: Date | null;
      image?: string | null;
      account?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
  }
}
