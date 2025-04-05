"use client";
import { useContext } from "react";
import Modal from "../ui/modal";
import AddToListForm from "../shopping-list/add-to-list-form";
import { ModalContext, ModalContextType } from "@/context/modal-context";
import InventoryForm from "../inventory/inventory-form";
import PurchaseForm from "../purchase/purchase-form";

interface FridgeModal {
  userId: string;
  fridgeId: string;
}

const FridgeModal = ({ userId, fridgeId }: FridgeModal) => {
  const { item, isOpen, inventory, handleOpen } =
    useContext<ModalContextType>(ModalContext);
  return (
    <Modal isOpen={isOpen} handleOpen={handleOpen} boxW="w-lg">
      {item === 0 && <AddToListForm userId={userId} fridgeId={fridgeId} />}
      {item === 1 && (
        <InventoryForm fridgeId={fridgeId} inventory={inventory} />
      )}
      {item === 2 && <PurchaseForm userId={userId} fridgeId={fridgeId} />}
    </Modal>
  );
};

export default FridgeModal;
