import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
import { FaCirclePlus, FaXmark, FaCamera } from "react-icons/fa6";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "className"> {
  variant?: "base" | "small" | "add" | "delete" | "photo" | "text";
  color?: "primary" | "secondary" | "outline" | "destructive";
  children?: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = "base",
  color,
  children,
  className,
  ...props
}: ButtonProps) => {
  const button = tv({
    base: "cursor-pointer md:hover:opacity-90 transition",
    variants: {
      variant: {
        base: "p-2.5 rounded-lg",
        small:
          "md:p-2 md:rounded-lg max-md:p-1.5 max-md:rounded-md max-md:text-sm",
        add: "text-5xl",
        delete: "leading-none p-3",
        photo:
          "w-14 h-14 rounded-full flex items-center justify-center text-2xl",
        text: "p-1",
      },
      color: {
        primary: cn(
          variant === "add" ? "text-primary" : "bg-primary text-white"
        ),
        secondary: cn(variant === "add" ? "text-secondary" : "bg-secondary"),
        outline: cn(variant === "add" ? null : "bg-white border border-gray"),
        destructive: cn(
          variant === "add"
            ? "text-destructive"
            : "md:bg-secondary md:hover:bg-destructive md:hover:text-white md:hover:opacity-100  max-md:bg-destructive max-md:text-white"
        ),
      },
    },
    compoundVariants: [
      {
        variant: ["base", "small"],
        class: "text-center",
      },
    ],
    defaultVariants: {
      variant: "base",
    },
  });
  return (
    <button
      className={cn(button({ variant: variant, color: color }), className)}
      {...props}
    >
      {variant === "base" || variant === "small" || variant === "text" ? (
        <>{children}</>
      ) : variant === "add" ? (
        <FaCirclePlus />
      ) : variant === "delete" ? (
        <FaXmark />
      ) : variant === "photo" ? (
        <FaCamera />
      ) : null}
    </button>
  );
};

export default Button;
