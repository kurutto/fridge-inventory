"use client";
import { createContext, useState } from "react";

export interface ModalContextType {
  item: number | null;
  isOpen: boolean;
  handleItemOpen: (itemNumber: number) => void;
  handleOpen: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  item: null,
  isOpen: false,
  handleItemOpen: () => {},
  handleOpen: () => {},
});

export const ModalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [item, setItem] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleItemOpen = (itemNumber: number) => {
    setItem(itemNumber);
    setIsOpen((prev) => !prev);
  };
  const handleOpen = () => {
    if(isOpen){
      setItem(null);
    }
    setIsOpen((prev) => !prev);
  };

  return (
    <ModalContext.Provider value={{ item, isOpen, handleItemOpen, handleOpen }}>
      {children}
    </ModalContext.Provider>
  );
};
