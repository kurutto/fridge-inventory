"use client";
import Button from "../ui/button";
import { useSession } from "next-auth/react";
import DeleteConfirm from "../confirm/delete-confirm";
import { PurchaseType } from "@/types/types";
import {useDeleteDataRemoveButton} from "@/hooks/use-dalete-data-from-remove-button";

interface RemovePurchaseButtonProps {
  fridgeId: string;
  purchase: PurchaseType;
}

const RemovePurchaseButton = ({
  fridgeId,
  purchase,
}: RemovePurchaseButtonProps) => {
  const { data: session } = useSession();
  const { isOpen, handleOpen, deleteItem } = useDeleteDataRemoveButton();
  const handleDelete = async (nextTimeHideConfirm: boolean | null) => {
    deleteItem(
      `/fridge/${fridgeId}/purchase/${purchase.id}`,
      nextTimeHideConfirm
    );
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
        handleOpen={()=>handleOpen()}
        confirmText={`${purchase.name}を削除しても良いですか？`}
        hideNextTime={true}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default RemovePurchaseButton;
