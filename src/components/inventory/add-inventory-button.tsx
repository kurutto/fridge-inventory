"use client";
import React, { useContext } from "react";
import Button, { ButtonProps } from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context";
interface AddInventoryButtonProps extends Omit<ButtonProps, "className"> {
  className?: string;
}
const AddInventoryButton = ({
  className,
  ...props
}: AddInventoryButtonProps) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      onClick={() => handleItemOpen(1)}
      {...props}
    />
  );
};

export default AddInventoryButton;
