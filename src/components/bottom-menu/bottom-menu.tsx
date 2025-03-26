"use client";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { menuItems } from "@/constants/menuItems";
import BottomMenuItem from "./bottom-menu-item";

interface BottomMenuProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  className?: string;
}
const BottomMenu = ({ className, ...props }: BottomMenuProps) => {
  const baseStyle = "grid grid-cols-4 bg-white";
  return (
    <ul className={cn(baseStyle, className)} {...props}>
      {menuItems.map((menuItem, idx) => (
        <BottomMenuItem
          icon={menuItem.icon}
          href={menuItem.link}
          onClick={menuItem.func}
          key={idx}
        >
          {menuItem.title}
        </BottomMenuItem>
      ))}
    </ul>
  );
};

export default BottomMenu;
