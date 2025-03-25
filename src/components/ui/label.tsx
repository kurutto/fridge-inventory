import { cn } from "@/lib/utils";

interface LabelProps
  extends Omit<React.ComponentPropsWithoutRef<"label">, "className"> {
  className?: string;
}
const Label = ({ className, children, ...props }: LabelProps) => {
  const baseStyle = "block";

  return (
    <label className={cn(baseStyle, className)} {...props}>
      {children}
    </label>
  );
};

export default Label;
