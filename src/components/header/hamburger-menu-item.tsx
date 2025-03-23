import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HamburgerMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  className?: string;
  children: React.ReactNode;
  hasSub?:boolean;
  link?: boolean;
  href?:string;
}

const HamburgerMenuItem = ({
  className,
  children,
  hasSub = false,
  link =true,
  href,
  ...props
}: HamburgerMenuItemProps) => {
  const baseStyle = "block p-4 border-b border-dotted border-gray";
  return (
    <li
      className={`${!link && baseStyle}  ${
        !hasSub && "md:hover:opacity-65 md:cursor-pointer"}`}
      {...props}
    >
      {link && href ? (
        <Link href={href} className={baseStyle}>{children}</Link>
      ) : (<>{children}</>)}
    </li>
  );
};

export default HamburgerMenuItem;