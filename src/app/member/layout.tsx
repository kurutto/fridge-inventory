import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import FridgeModal from "@/components/fridge/fridge-modal";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/signin");
  }

  return (
    <>
      {children}
      {session.user.fridgeId && <FridgeModal userId={session.user.id} fridgeId={session.user.fridgeId} />}
      
    </>
    )
}
