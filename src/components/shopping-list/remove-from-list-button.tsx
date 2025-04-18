"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";
import DeleteConfirm from "../confirm/delete-confirm";
import { useSession } from "next-auth/react";
import { ShoppingListType } from "@/types/types";

interface RemoveFromListButtonProps {
  fridgeId: string;
  listItem: ShoppingListType;
}

const RemoveFromListButton = ({
  fridgeId,
  listItem,
}: RemoveFromListButtonProps) => {
  const { update, data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleDelete = async (data: boolean | null) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list/${listItem.id}`,
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
        aria-label="買物リストから削除"
      />
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${listItem.name}を削除しても良いですか？`}
        hideNextTime={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemoveFromListButton;
