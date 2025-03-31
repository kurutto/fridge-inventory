import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";

interface ListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className"> {
  variant?: "ul" | "ol";
  space?: "base" | "lg" | "none";
  items: React.ReactNode[];
  className?: string;
}

const List = ({
  variant = "ul",
  space = "base",
  items,
  className,
  ...props
}: ListProps) => {
  const Tag: React.ElementType = variant === "ol" ? "ol" : "ul";
  const list = tv({
    base: " ml-4",
    variants: {
      variant: {
        ul: "-indent-4",
        ol: "list-decimal",
      },
      space: {
        base: "space-y-1.5",
        lg: "space-y-2.5",
        none: "",
      },
    },
    defaultVariants: {
      variant: "ul",
      space: "base",
    },
  });

  return (
    <Tag
      className={cn(list({ variant: variant, space: space }), className)}
      {...props}
    >
      {items.map((item,idx) => (
        <li key={idx}>{variant === 'ul'&& "・"}{item}</li>
      ))}
    </Tag>
  );
};

export default List;