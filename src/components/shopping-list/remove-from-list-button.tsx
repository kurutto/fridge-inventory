"use client";
import React from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

interface RemoveFromListButtonProps {
  fridgeId: string;
  listItemId: string;
}

const RemoveFromListButton = ({ fridgeId, listItemId }: RemoveFromListButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list/${listItemId}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  };
  return (
    <Button
      variant="delete"
      onClick={handleDelete}
      className="absolute top-0 right-0"
    />
  );
};

export default RemoveFromListButton;
