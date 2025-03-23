import type { ComponentPropsWithoutRef } from 'react'

interface MenuItemProps
  extends Omit<ComponentPropsWithoutRef<'li'>, "className"> {
  className?: string;
  children:React.ReactNode;
}
const MenuItem = ({className,children,...props}:MenuItemProps) => {
  return (
    <li className="md:hover:opacity-65 transition-opacity" {...props}>{children}</li>
  )
}

export default MenuItem