"use client";
import Button from "../ui/button";
import { UserFridgeType } from "@/types/types";
import DeleteConfirm from "../confirm/delete-confirm";
import {useDeleteData} from "@/hooks/use-delete-data-from-modal";
import { useHandleOpen } from "@/hooks/use-handle-open";

interface RemoveFromUserListButtonProps {
  fridgeId: string;
  user: UserFridgeType;
}

const RemoveFromMemberListButton = ({
  fridgeId,
  user,
}: RemoveFromUserListButtonProps) => {
  const { deleteItem } = useDeleteData();
  const { isOpen, handleOpen } = useHandleOpen();
  const handleDelete = async () => {
    await deleteItem(`/fridge/${fridgeId}/account/${user.userId}`, handleOpen);
  };
  return (
    <>
      <Button
        color="secondary"
        size="small"
        onClick={()=>handleOpen()}
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
