import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/signin");
  }
  console.log("layout session:", session);

  return <>{children}</>;
}
