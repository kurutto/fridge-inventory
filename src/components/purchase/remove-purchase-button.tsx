"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DeleteConfirm from "../confirm/delete-confirm";
import { PurchaseType } from "@/types/types";

interface RemovePurchaseButtonProps {
  fridgeId: string;
  purchase: PurchaseType;
}

const RemovePurchaseButton = ({
  fridgeId,
  purchase,
}: RemovePurchaseButtonProps) => {
  const { update, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const router = useRouter();
  const handleDelete = async (data: boolean | null) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase/${purchase.id}`,
      {
        method: "DELETE",
      }
    );
    if (data) {
      await update({ deleteConfirm: false });
    }
    setIsOpen(false);
    router.refresh();
  };
  return (
    <>
      <Button
        variant="delete"
        onClick={() => {
          if (session?.user.deleteConfirm === true) {
            handleOpen();
          } else {
            handleDelete(false);
          }
        }}
        className="absolute top-0 right-0"
        aria-label="購入品削除"
      />
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${purchase.name}を削除しても良いですか？`}
        hideNextTime={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemovePurchaseButton;
