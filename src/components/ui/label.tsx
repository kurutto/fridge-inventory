import { cn } from "@/lib/utils";

interface LabelProps
  extends Omit<React.ComponentPropsWithoutRef<"label">, "className"> {
  className?: string;
}
const Label = ({ className, ...props }: LabelProps) => {
  const baseStyle = "block leading-11";

  return <label className={cn(baseStyle, className)} {...props} />;
};

export default Label;
