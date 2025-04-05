"use client";
import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { useMenuItems } from "@/hooks/use-menu-items";
import BottomMenuItem from "./bottom-menu-item";

interface BottomMenuProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  className?: string;
}
const BottomMenu = ({ className, ...props }: BottomMenuProps) => {
  const { menuItems } = useMenuItems();
  const baseStyle = "grid grid-cols-4 bg-white z-25";
  return (
    <>
      <ul className={cn(baseStyle, className)} {...props}>
        {menuItems.map((menuItem, idx) => (
          <BottomMenuItem
            key={idx}
            icon={menuItem.icon}
            onClick={menuItem.func}
            href={menuItem.link}
          >
            {menuItem.title}
          </BottomMenuItem>
        ))}
        {/* <BottomMenuItem
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
          </BottomMenuItem> */}
      </ul>
    </>
  );
};

export default BottomMenu;
