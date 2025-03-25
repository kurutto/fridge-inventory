import { cn } from "@/lib/utils";

interface headingProps
  extends Omit<React.ComponentPropsWithoutRef<"h1">, "className"> {
  level?: 1 | 2 | 3;
  icon?: React.ElementType;
  outline?: boolean;
  children: React.ReactNode;
  className?: string;
}
const Heading = ({
  level = 3,
  icon: Icon,
  outline = false,
  children,
  className,
  ...props
}: headingProps) => {
  const Tag: React.ElementType = `h${level}`;
  const baseStyle = cn(
    level === 1 &&
      "flex items-center justify-center font-bold md:text-2xl md:gap-4 max-md:text-xl max-md:gap-2.5",
    level === 2 &&
      cn(
        "flex items-center font-bold md:text-xl md:gap-4 max-md:text-lg max-md:gap-2.5",
        outline &&
          "bg-white rounded-2xl md:py-5 md:px-7 md:shadow-[0_0_7px_rgba(0,0,0,0.1)] max-md:py-3.5 max-md:px-3.5 max-md:shadow-[0_2px_5px_rgba(0,0,0,0.05)]"
      ),
    level === 3 && "font-bold md:text-lg max-md:text-base"
  );
  const iconStyle = cn(
    level === 1 && "md:text-3xl max-md:text-2xl",
    level === 2 && "md:text-2xl max-md:text-lg"
  );

  return (
    <Tag className={cn(baseStyle, className)} {...props}>
      {Icon && <Icon className={iconStyle} />}
      {children}
    </Tag>
  );
};

export default Heading;
