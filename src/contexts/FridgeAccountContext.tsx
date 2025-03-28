import { createContext, useEffect, useState } from 'react';
import { useSession } from "next-auth/react";

const FridgeAccountContext = createContext({});

export function FridgeAccountProvider( {children}:{children:React.ReactNode}){
  const { data: session, update } = useSession();
  const [fridgeAccounts, setFridgeAccounts] = useState();
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
      update({fridgeId:fridgeId})

    }
    return (
      <FridgeAccountContext.Provider value={{ fridgeAccounts, changeFridgeAccount }}>
        {children}
      </FridgeAccountContext.Provider>
    );

}