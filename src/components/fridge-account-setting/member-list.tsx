import React from "react";
import Box from "../ui/box";
import Heading from "../ui/heading";
import { Li, List } from "../ui/list";
import { UserFridgeType } from "@/types/types";
import RemoveFromUserListButton from "./remove-from-member-button";

interface UserListProps {
  fridgeId: string;
  users: UserFridgeType[];
}

const MemberList = ({ fridgeId, users }: UserListProps) => {
  return (
    <Box variant="spaceY" className="mb-8">
      <Heading level={3}>メンバー一覧</Heading>
      <List>
        {users.map((user) => (
          <Li
            key={user.userId}
            className="flex md:justify-between items-center"
          >
            ・{user.user.name}
            <RemoveFromUserListButton fridgeId={fridgeId} user={user} />
          </Li>
        ))}
      </List>
    </Box>
  );
};

export default MemberList;
