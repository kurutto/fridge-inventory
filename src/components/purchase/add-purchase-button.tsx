"use client";
import React, { useContext } from "react";
import Button, { ButtonProps } from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context";

interface AddPurchaseButtonProps extends Omit<ButtonProps, "className"> {
  className?: string;
}
const AddPurchaseButton = ({ className, ...props }: AddPurchaseButtonProps) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      onClick={() => handleItemOpen(2)}
      {...props}
    />
  );
};

export default AddPurchaseButton;
