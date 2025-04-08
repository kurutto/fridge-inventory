import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import { getFridgeAccount } from "@/lib/fridge";
import Paragraph from "@/components/ui/paragraph";
import { UserFridgeType } from "@/types/types";
import Button from "@/components/ui/button";
import UserRegistration from "@/components/fridge-account-setting/user-registration";
import UserList from "@/components/fridge-account-setting/user-list";

const FridgePage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const fridgeAccount = await getFridgeAccount(fridgeId);
  const users: UserFridgeType[] = fridgeAccount.userFridges;
  return (
    <>
      <Heading level={1}>冷蔵庫アカウント管理</Heading>
      <Box variant="rounded">
        <Heading level={3}>冷蔵庫アカウントID</Heading>
        <Paragraph>{fridgeAccount.id}</Paragraph>
        <Heading level={3}>冷蔵庫アカウント名</Heading>
        <Paragraph>{fridgeAccount.name}</Paragraph>
        <Heading level={3}>冷蔵庫アカウント概要</Heading>
        <Paragraph>{fridgeAccount.description}</Paragraph>
        <Button color="primary">編集</Button>
      </Box>
      <UserList fridgeId={fridgeId} users={users} />
      <UserRegistration fridgeId={fridgeId} />
    </>
  );
};

export default FridgePage;
