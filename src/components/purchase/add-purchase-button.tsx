"use client";
import React, { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context";

const AddPurchaseButton = () => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      aria-label="購入品追加"
      onClick={() => handleItemOpen(2)}
    />
  );
};

export default AddPurchaseButton;
