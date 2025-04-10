"use client";
import React from "react";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

interface RemovePurchaseButtonProps {
  fridgeId: string;
  purchaseId: string;
}

const RemovePurchaseButton = ({
  fridgeId,
  purchaseId,
}: RemovePurchaseButtonProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase/${purchaseId}`, {
      method: "DELETE",
    });
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

export default RemovePurchaseButton;
