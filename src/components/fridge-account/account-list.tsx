'use client'
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Button from "../ui/button";
import { FridgeType } from "@/types/types";

const AccountList = () => {
  const { data: session } = useSession();
  const [fridgeAccounts, setFridgeAccounts] = useState<FridgeType[]>([]);
  useEffect(() => {
    if(session){
    const getFridgeAccounts = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${session?.user.id}`
      );
      const data = await res.json();
      setFridgeAccounts(data);
    };
    getFridgeAccounts();
  }
  }, [session]);
  return (
    <ul className="space-y-4 pt-4">
      {fridgeAccounts.map((fridgeAccount,idx) => (
        <li className="text-center" key={idx}>
          <Button color="outline" className="min-w-52">{fridgeAccount.name}
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default AccountList;
