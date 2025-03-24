import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { FaListUl } from "react-icons/fa6";
import { FaCubesStacked } from "react-icons/fa6";
import { FaBagShopping } from "react-icons/fa6";
import { FaFileLines } from "react-icons/fa6";
import BottomMenuItem from "./bottom-menu-item";
import Link from "next/link";

interface BottomMenuProps
  extends Omit<ComponentPropsWithoutRef<"ul">, "className"> {
  className?: string;
}
const BottomMenu = ({ className, ...props }: BottomMenuProps) => {
  const baseStyle = "grid grid-cols-4 bg-white";
  return (
    <ul className={cn(baseStyle, className)} {...props}>
      <BottomMenuItem as="div" icon={FaListUl}>
        買物リスト追加
      </BottomMenuItem>
      <BottomMenuItem as="div" icon={FaCubesStacked}>
        在庫管理追加
      </BottomMenuItem>
      <BottomMenuItem as={Link} href="/" icon={FaBagShopping}>
        購入品追加
      </BottomMenuItem>
      <BottomMenuItem as={Link} href="/" icon={FaFileLines}>
        購入品履歴
      </BottomMenuItem>
    </ul>
  );
};

export default BottomMenu;
