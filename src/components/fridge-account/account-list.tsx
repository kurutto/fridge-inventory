"use client";
import Button from "../ui/button";
import { FridgeAccountContextType } from "@/contexts/FridgeAccountContext";

const AccountList = ({
  fridgeAccounts,
  changeFridgeAccount,
}: FridgeAccountContextType) => {
  if (!fridgeAccounts) {
    return;
  }
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
