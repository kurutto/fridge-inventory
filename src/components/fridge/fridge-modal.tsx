"use client";
import React, { useContext } from "react";
import Modal from "../ui/modal";
import AddListForm from "../shopping-list/add-list-form";
import { ModalContext, ModalContextType } from "@/context/modal-context";

interface FridgeModal {
  userId:string;
  fridgeId:string;
}

const FridgeModal = ({userId,fridgeId}:FridgeModal) => {
  const { item, isOpen, handleOpen } = useContext<ModalContextType>(ModalContext);
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} boxW="w-lg max-w-9/10">
      {item === 0 && <AddListForm userId={userId} fridgeId={fridgeId} />}
    </Modal>
  );
};

export default FridgeModal;
