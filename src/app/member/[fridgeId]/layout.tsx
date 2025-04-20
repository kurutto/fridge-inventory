import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import BottomMenu from "@/components/bottom-menu/bottom-menu";
import FridgeModal from "@/components/fridge/fridge-modal";

export default async function FridgeLayout({
  params,
  children,
}: Readonly<{
  params: Promise<{ fridgeId: string }>;
  children: React.ReactNode;
}>) {
  const { fridgeId } = await params;
  const session = await getServerSession(nextAuthOptions);
  if (fridgeId !== session?.user.fridgeId) {
    redirect("/member/fridge-account");
  }

  return (
    <>
      {children}
      <BottomMenu
        fridgeId={fridgeId}
        className="md:hidden fixed bottom-0 left-0 w-full"
      />
    </>
  );
}
