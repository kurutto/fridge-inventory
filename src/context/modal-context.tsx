"use client";
import { createContext, useState } from "react";

export interface ModalContextType {
  item: number;
  isOpen: boolean;
  handleItemOpen:(itemNumber: number) => void;
  handleOpen: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  item : 0,
  isOpen : false,
  handleItemOpen : () => {},
  handleOpen : () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [item, setItem] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const handleItemOpen = (itemNumber: number) => {
    setItem(itemNumber);
    setIsOpen((prev) => !prev);
  }
  const handleOpen = () => {
    setIsOpen((prev) => !prev)
  }


  return (
    <ModalContext.Provider value={{item,isOpen,handleItemOpen,handleOpen}}>{children}</ModalContext.Provider>
  );
};