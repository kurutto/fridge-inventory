"use client";
import React from "react";
import Button from "../ui/button";
import { UserFridgeType } from "@/types/types";
import { useRouter } from "next/navigation";

interface RemoveFromUserListButtonProps {
  fridgeId: string;
  user: UserFridgeType;
}

const RemoveFromMemberListButton = ({
  fridgeId,
  user,
}: RemoveFromUserListButtonProps) => {
  const router = useRouter();
  const handleDelete = async (user: UserFridgeType) => {
    const confirmed = confirm(
      `${user.user.name}をアカウントから削除しますか？`
    );
    if (!confirmed) return;
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/account/${user.userId}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  };
  return (
    <Button
      color="secondary"
      variant="small"
      onClick={() => handleDelete(user)}
      className="max-md:ml-4"
    >
      削除
    </Button>
  );
};

export default RemoveFromMemberListButton;
