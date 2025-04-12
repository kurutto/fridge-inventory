import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { getUser } from "@/lib/user";
import AccountList from "@/components/fridge-account/account-list";
import CreateAccount from "@/components/fridge-account/create-account";
import Heading from "@/components/ui/heading";
import Paragraph from "@/components/ui/paragraph";

const page = async () => {
  const session = await getServerSession(nextAuthOptions);
  const user = await getUser(session!.user.id);
  return (
    <>
      <Heading level={1}>FIショッピングリスト</Heading>
      {user.userFridges.length > 0 && (
        <>
          <AccountList fridgeAccounts={user.userFridges} />
          <Paragraph color="gray" className="text-center">
            or
          </Paragraph>
        </>
      )}
      <CreateAccount />
    </>
  );
};

export default page;
