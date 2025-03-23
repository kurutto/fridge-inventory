import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from 'react'
import Link from "next/link";
import MenuItem from "./menu-item";

interface MenuProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, "className"> {
  className?: string;
}
const Menu = ({ className, ...props }: MenuProps) => {
  const baseStyle = "";
  return (
    <ul className={cn(baseStyle, className)} {...props}>
      <MenuItem><Link href="">買物リスト追加</Link></MenuItem>
      <MenuItem><Link href="">在庫管理追加</Link></MenuItem>
      <MenuItem><Link href="">購入品追加</Link></MenuItem>
      <MenuItem><Link href="">購入履歴追加</Link></MenuItem>
    </ul>
  );
};

export default Menu;
