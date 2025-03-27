import { cn } from "@/lib/utils";
import React from "react";

interface SelectProps
  extends Omit<React.ComponentPropsWithRef<"select">, "className"> {
  options: string[];
  padding?: "base" | "small";
  className?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, padding = "base", className, ...props }, ref) => {
    const baseStyle = cn(
      "p-2.5 rounded-md border border-light-gray bg-white outline-none",
      padding === "base" && "p-2.5",
      padding === "small" && "md:py-2 max-md:px-1.5 max-md:py-1"
    );
    return (
      <select className={cn(baseStyle, className)} {...props} ref={ref}>
        {options.map((option, idx) => (
          <option key={idx}>{option}</option>
        ))}
      </select>
    );
  }
);

export default Select;
