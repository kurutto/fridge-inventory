import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from 'react'
import Link from "next/link";

interface MenuProps
  extends Omit<ComponentPropsWithoutRef<'ul'>, "className"> {
  className?: string;
}
const menuItem = [
  <Link href="">買物リスト追加</Link>,
  <Link href="">在庫管理追加</Link>,
  <Link href="">購入品追加</Link>,
  <Link href="">購入履歴追加</Link>,
];
const Menu = ({ className, ...props }: MenuProps) => {
  const baseStyle = "";
  return (
    <ul className={cn(baseStyle, className)} {...props}>
      {menuItem.map((item,idx) => (
        <li key={idx} className="md:hover:opacity-65 transition-opacity">{item}</li>
      ))}
    </ul>
  );
};

export default Menu;
