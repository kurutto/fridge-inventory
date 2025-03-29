"use client";
import { FridgeType } from "@/types/types";
import { useChangeFridgeAccount } from "@/hooks/useChangeFridgeAccount";
import Button from "../ui/button";

const AccountList = ({
  fridgeAccounts,
}:{fridgeAccounts:FridgeType[]} ) => {
  if (!fridgeAccounts) {
    return;
  }
  const {changeFridgeAccount} = useChangeFridgeAccount()

  return (
    <ul className="space-y-4 pt-4">
      {fridgeAccounts.map((fridgeAccount, idx) => (
        <li className="text-center" key={idx}>
          <Button color="outline" className="min-w-52" onClick={()=>changeFridgeAccount(fridgeAccount.id)}>
            {fridgeAccount.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AccountList;
