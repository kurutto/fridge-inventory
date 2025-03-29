import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { getFridgeAccounts } from '@/lib/fridge';
import AccountList from '@/components/fridge-account/account-list'
import CreateAccount from '@/components/fridge-account/create-account'
import Heading from '@/components/ui/heading'
import Paragraph from '@/components/ui/paragraph'

const page = async() => {
  const session = await getServerSession(nextAuthOptions);
  const fridgeAccounts = await getFridgeAccounts(session!.user.id);
  return (
    <>
      <Heading level={1}>FIショッピングリスト</Heading>
      {session?.user.fridgeId && (
        <> 
          <AccountList fridgeAccounts={fridgeAccounts} />
          <Paragraph color='gray' className='text-center'>or</Paragraph>
        </>
      )}
      <CreateAccount />
    </>
  )
}

export default page