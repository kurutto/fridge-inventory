"use client";
import React, { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context";
import { InventoryType } from "@/types/types";

const EditInventoryButton = ({ inventory }: { inventory: InventoryType }) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="small"
      color="secondary"
      className="w-20"
      onClick={() => handleItemOpen(1, inventory)}
    >
      編集
    </Button>
  );
};

export default EditInventoryButton;
