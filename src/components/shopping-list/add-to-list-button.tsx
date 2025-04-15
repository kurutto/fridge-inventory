"use client";
import { useContext } from "react";
import Button, { ButtonProps } from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context";

const AddToListButton = ({ ...props }: ButtonProps) => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button
      variant="add"
      color="primary"
      onClick={() => handleItemOpen(0)}
      {...props}
    />
  );
};

export default AddToListButton;
