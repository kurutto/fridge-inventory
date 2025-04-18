"use client";
import React, { useState } from "react";
import Button from "../ui/button";
import { UserFridgeType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DeleteConfirm from "../confirm/delete-confirm";

interface RemoveFromUserListButtonProps {
  fridgeId: string;
  user: UserFridgeType;
}

const RemoveFromMemberListButton = ({
  fridgeId,
  user,
}: RemoveFromUserListButtonProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const router = useRouter();
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/account/${user.userId}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  };
  return (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={
          session?.user.deleteConfirm === true ? handleOpen : handleDelete
        }
        className="max-md:ml-4"
      >
        削除
      </Button>
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${user.user.name}をアカウントから削除しますか？`}
        hideNextTime={false}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemoveFromMemberListButton;
