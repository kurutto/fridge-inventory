import { useState } from "react";

export const useAddListModal = () => {
  const [isAddListModalOpen, setIsAddListModalOpen] = useState(false);
  const handleAddListModalOpen = () => {
    setIsAddListModalOpen((prev) => !prev);
  };

  return { isAddListModalOpen, handleAddListModalOpen };
};
