"use client";
import React, { useContext } from "react";
import { ModalContext, ModalContextType } from "@/context/modal-context"
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menuItems";
import BottomMenuItem from "./bottom-menu-item";

interface BottomMenuProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  className?: string;
}
const BottomMenu = ({ className, ...props }: BottomMenuProps) => {
  const { handleItemOpen} = useContext<ModalContextType>(ModalContext);
  const baseStyle = "grid grid-cols-4 bg-white";
  return (
    <>
      <ul className={cn(baseStyle, className)} {...props}>
          <BottomMenuItem
            icon={menuItems[0].icon}
            onClick={() => handleItemOpen(0)}
          >
            {menuItems[0].title}
          </BottomMenuItem>
          <BottomMenuItem
            icon={menuItems[1].icon}
            onClick={() => handleItemOpen(1)}
          >
            {menuItems[1].title}
          </BottomMenuItem>
          <BottomMenuItem
            icon={menuItems[2].icon}
            href="/"
          >
            {menuItems[2].title}
          </BottomMenuItem>
          <BottomMenuItem
            icon={menuItems[3].icon}
            href="/"
          >
            {menuItems[3].title}
          </BottomMenuItem>
      </ul>
    </>
  );
};

export default BottomMenu;
