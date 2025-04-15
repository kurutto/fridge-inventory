import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
import {
  FaCirclePlus,
  FaXmark,
  FaCamera,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa6";

interface ButtonProps
  extends Omit<React.ComponentPropsWithoutRef<"button">, "className"> {
  variant?: "base" | "add" | "delete" | "photo" | "angle" | "text";
  angle?: "up" | "down";
  color?: "primary" | "secondary" | "outline" | "destructive";
  size?: "base" | "small";
  children?: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = "base",
  angle,
  color,
  size,
  children,
  className,
  ...props
}: ButtonProps) => {
  const button = tv({
    base: "cursor-pointer hover:opacity-90 transition",
    variants: {
      variant: {
        base: " flex justify-center items-center gap-2",
        add: "",
        delete: "leading-none p-3",
        photo:
          "w-14 h-14 rounded-full flex items-center justify-center text-2xl",
        angle: "text-sm",
        text: "hover:underline hover:underline-offset-4",
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
            : "hover:opacity-100 md:bg-secondary md:hover:bg-destructive md:hover:text-white  max-md:bg-destructive max-md:text-white"
        ),
      },
      size: {
        base: cn(
          variant === "base" && "p-2.5 rounded-lg ",
          variant === "add" && "md:text-[40px] max-md:text-4xl"
        ),
        small: cn(
          variant === "base" &&
            "md:p-2 md:rounded-lg max-md:p-1.5 max-md:rounded-md max-md:text-sm",
          variant === "add" && "text-xl align-middle px-1 -mt-1"
        ),
      },
    },
    compoundVariants: [
      {
        variant: ["base"],
        class: "text-center",
      },
    ],
    defaultVariants: {
      variant: "base",
      size: "base",
    },
  });
  return (
    <button
      className={cn(button({ variant: variant, color: color, size:size }), className)}
      {...props}
    >
      {variant === "base" || variant === "text" ? (
        <>{children}</>
      ) : variant === "add" ? (
        <FaCirclePlus />
      ) : variant === "delete" ? (
        <FaXmark />
      ) : variant === "photo" ? (
        <FaCamera />
      ) : variant === "angle" && angle === "up" ? (
        <FaArrowUp />
      ) : variant === "angle" && angle === "down" ? (
        <FaArrowDown />
      ) : null}
    </button>
  );
};

export default Button;
