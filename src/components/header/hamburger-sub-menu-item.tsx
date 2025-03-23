import type { ComponentPropsWithoutRef } from 'react'

interface HamburgerSubMenuItemProps   
extends Omit<ComponentPropsWithoutRef<'li'>, "className"> {
  className?: string;
  children:React.ReactNode;
}

const HamburgerSubMenuItem = ({className,children,...props}:HamburgerSubMenuItemProps) => {
  return (
    <li className='md:hover:opacity-65 pt-2 pl-3 cursor-pointer'>-&nbsp;{children}</li>
  )
}

export default HamburgerSubMenuItem