"use client";
import React from "react";
import Box from "../ui/box";
import Heading from "../ui/heading";
import { Li, List } from "../ui/list";
import { UserFridgeType } from "@/types/types";
import Button from "../ui/button";
import { useRouter } from "next/navigation";

interface UserListProps {
  fridgeId: string;
  users: UserFridgeType[];
}

const UserList = ({ fridgeId, users }: UserListProps) => {
  const router = useRouter();

  const handleDelete = async (user: UserFridgeType) => {
    confirm(`${user.user.name}をアカウントから削除しますか？`);
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/account/${user.userId}`,
      {
        method: "DELETE",
      }
    );
    router.refresh();
  };
  return (
    <Box variant="rounded">
      <Heading level={3}>ユーザー一覧</Heading>
      <List>
        {users.map((user) => (
          <Li key={user.userId} className="flex justify-between items-center">
            ・{user.user.name}
            <Button
              color="secondary"
              variant="small"
              onClick={() => handleDelete(user)}
            >
              削除
            </Button>
          </Li>
        ))}
      </List>
    </Box>
  );
};

export default UserList;
