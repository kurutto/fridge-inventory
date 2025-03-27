import { cn } from "@/lib/utils";
import React from "react";

interface BoxProps
  extends Omit<React.ComponentPropsWithoutRef<"p">, "className"> {
  variant?: "error";
  className?: string;
}

const Paragraph = ({ variant, className, ...props }: BoxProps) => {
  const baseStyle = cn(variant === "error" && "text-xs text-destructive");
  return <p className={cn(baseStyle, className)} {...props} />;
};

export default Paragraph;
