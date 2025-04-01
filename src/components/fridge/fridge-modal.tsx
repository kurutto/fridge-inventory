"use client";
import { useContext } from "react";
import Modal from "../ui/modal";
import AddToListForm from "../shopping-list/add-to-list-form";
import { ModalContext, ModalContextType } from "@/context/modal-context";
import InventoryForm from "../inventory/inventory-form";

interface FridgeModal {
  userId: string;
  fridgeId: string;
}

const FridgeModal = ({ userId, fridgeId }: FridgeModal) => {
  const { item, isOpen, inventory, handleOpen } =
    useContext<ModalContextType>(ModalContext);
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} boxW="w-lg max-w-9/10">
      {item === 0 && <AddToListForm userId={userId} fridgeId={fridgeId} />}
      {item ===1 && <InventoryForm fridgeId={fridgeId} inventory={inventory} />}
    </Modal>
  );
};

export default FridgeModal;
