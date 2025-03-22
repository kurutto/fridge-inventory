"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const accounts = ["account1", "account2"];

const page = () => {
  const router = useRouter();
  const { data: session, update } = useSession();
  if(!session){
    router.push("/login");
  }
  if(session && session.user.account){
    router.push("/");
  }
  const handleAccount = async (data: string) => {
    await update({ account: data });
    router.push("/");
  };
  return (
    <div>
      <p>アカウントを選択してください</p>
      <ul>
        {accounts.map((account, idx) => (
          <li key={idx} onClick={() => handleAccount(account)}>
            {account}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
