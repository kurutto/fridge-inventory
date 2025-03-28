'use client'
import AccountList from '@/components/fridge-account/account-list'
import CreateAccount from '@/components/fridge-account/create-account'
import Heading from '@/components/ui/heading'
import Paragraph from '@/components/ui/paragraph'
import {
  FridgeAccountContext,
  FridgeAccountContextType,
} from "@/contexts/FridgeAccountContext";
import { useContext } from 'react';

const page = () => {
  const { fridgeAccounts, changeFridgeAccount } =
    useContext<FridgeAccountContextType>(FridgeAccountContext);
  return (
    <>
      <Heading level={1}>FIショッピングリスト</Heading>
      {fridgeAccounts && (
        <> 
          <AccountList fridgeAccounts={fridgeAccounts} changeFridgeAccount={changeFridgeAccount} />
          <Paragraph color='gray' className='text-center'>or</Paragraph>
        </>
      )}
      <CreateAccount />
    </>
  )
}

export default page