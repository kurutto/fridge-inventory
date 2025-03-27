import { cn } from "@/lib/utils";
import React from "react";

interface InputProps
  extends Omit<React.ComponentPropsWithRef<"input">, "className"> {
  type: string;
  padding?: "base" | "small";
  className?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, padding, className, ...props }, ref) => {
    const baseStyle = cn(
      "p-2.5 rounded-md border border-light-gray bg-white outline-none",
      padding === "base" && "p-2.5",
      padding === "small" && "md:py-2 max-md:px-1.5 max-md:py-1",
      type === "checkbox" && "w-4 h-4 accent-primary"
    );
    return (
      <input
        type={type}
        className={cn(baseStyle, className)}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
