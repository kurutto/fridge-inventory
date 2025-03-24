import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

interface BottomMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"li">, "className"> {
  className?: string;
  as: "div" | React.ComponentType<any>;
  href?: string;
  icon: React.ComponentType<any>;
  children: React.ReactNode;
}
const BottomMenuItem = ({
  className,
  icon,
  as: Tag,
  href = "/",
  icon: Icon,
  children,
  ...props
}: BottomMenuItemProps) => {
  const tagProps = Tag === Link ? { href } : {};

  return (
    <li className={className} {...props}>
      <Tag className="block py-2 text-center" {...tagProps}>
        <div className="w-fit mx-auto">
          <Icon className="text-xl" />
        </div>
        <div className="text-xs">{children}</div>
      </Tag>
    </li>
  );
};

export default BottomMenuItem;
