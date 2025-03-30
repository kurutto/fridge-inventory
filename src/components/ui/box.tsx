import { cn } from "@/lib/utils";

interface BoxProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "className"> {
  variant?: "rounded" | "horizontally" | "spaceY";
  className?: string;
}

const Box = ({ variant, className, ...props }: BoxProps) => {
  const baseStyle = cn(
    variant === "rounded" &&
      "bg-white md:rounded-[20px] md:p-8 md:space-y-8 md:shadow-pc max-md:rounded-2xl max-md:px-4 max-md:py-6 max-md:space-y-6 max-md:shadow-sp",
      variant === "horizontally" && "sm:flex sm:items-center sm:space-x-4 max-sm:space-y-2",
      variant === "spaceY" && 'space-y-4',
  );
  return <div className={cn(baseStyle, className)} {...props} />;
};

export default Box;
