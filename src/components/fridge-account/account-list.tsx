"use client";
import { FridgeType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/use-change-fridge-account";
import Button from "../ui/button";
import { cn } from "@/lib/utils";

interface AccountListProps
  extends Omit<React.ComponentPropsWithoutRef<"ul">, "className"> {
  fridgeAccounts: FridgeType[];
  className?: string;
}

const AccountList = ({
  fridgeAccounts,
  className,
  ...props
}: AccountListProps) => {
  const { changeFridgeAccount } = useChangeFridgeAccount();
  if (!fridgeAccounts) {
    return null;
  }
  const baseStyle = "space-y-4 pt-4";

  return (
    <ul className={cn(baseStyle, className)} {...props}>
      {fridgeAccounts.map((fridgeAccount, idx) => (
        <li className="text-center" key={idx}>
          <Button
            color="outline"
            className="min-w-52"
            onClick={() => changeFridgeAccount(fridgeAccount.id)}
          >
            {fridgeAccount.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AccountList;
