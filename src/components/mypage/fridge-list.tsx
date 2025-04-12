"use client";
import { UserFridgeType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/use-change-fridge-account";
import Button from "../ui/button";
import { cn } from "@/lib/utils";
import { Li, List } from "../ui/list";

interface FridgeListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className"> {
  fridgeAccounts: UserFridgeType[];
  className?: string;
}

const FridgeList = ({
  fridgeAccounts,
  className,
  ...props
}: FridgeListProps) => {
  const { changeFridgeAccount } = useChangeFridgeAccount();
  if (!fridgeAccounts) {
    return null;
  }
  const baseStyle = "space-y-4 pt-4";

  return (
    <List className={cn(baseStyle, className)} {...props}>
      {fridgeAccounts.map((fridgeAccount, idx) => (
        <Li key={idx}>
          ・
          <Button
            variant="text"
            className="pb-1.5"
            onClick={() => changeFridgeAccount(fridgeAccount.fridgeId)}
          >
            {fridgeAccount.fridge.name}
          </Button>
          <br />
          {fridgeAccount.fridge.description}
        </Li>
      ))}
    </List>
  );
};

export default FridgeList;
