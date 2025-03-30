import { useState } from "react";

export const useHandleOpen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, handleOpen };
};
