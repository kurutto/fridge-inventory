'use client'
import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { FridgeType } from '@/types/types';
import { useRouter } from 'next/navigation';

export interface FridgeAccountContextType{
  fridgeAccounts?:FridgeType[];
  changeFridgeAccount:(fridgeId:string) => void;
}

export const FridgeAccountContext = createContext<FridgeAccountContextType>({
  fridgeAccounts: [], 
  changeFridgeAccount: () => {},
});

export function FridgeAccountProvider( {children}:{children:React.ReactNode}){
  const router = useRouter()
  const { data: session, update } = useSession();
  const [fridgeAccounts, setFridgeAccounts] = useState<FridgeType[]>();
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
    const changeFridgeAccount = (fridgeId:string) => {
      update({fridgeId:fridgeId});
      router.push(`/member/${fridgeId}`);
    }
    return (
      <FridgeAccountContext.Provider value={{ fridgeAccounts, changeFridgeAccount }}>
        {children}
      </FridgeAccountContext.Provider>
    );

}