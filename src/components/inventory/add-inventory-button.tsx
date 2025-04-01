"use client";
import React, { useContext } from "react";
import Button from "../ui/button";
import { ModalContext, ModalContextType } from "@/context/modal-context"

const AddInventoryButton = () => {
  const { handleItemOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Button variant="add" color="primary" onClick={() => handleItemOpen(1)} />
  );
};

export default AddInventoryButton;
