"use client";
import { useContext } from "react";
import Button, { ButtonProps } from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context"

interface AddToListButtonProps extends Omit<ButtonProps, "className"> {
  className?: string;
}

const AddToListButton = ({className,...props}:AddToListButtonProps) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button variant="add" color="primary" onClick={() => handleItemOpen(0)} {...props} />
  );
};

export default AddToListButton;
