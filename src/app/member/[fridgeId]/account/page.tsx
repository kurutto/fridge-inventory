import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import { getFridgeAccount } from "@/lib/fridge";
import Paragraph from "@/components/ui/paragraph";
import { UserFridgeType } from "@/types/types";
import Button from "@/components/ui/button";
import Label from "@/components/ui/label";
import MemberList from "@/components/fridge-account-setting/member-list";
import MemberRegistration from "@/components/fridge-account-setting/member-registration";

const FridgePage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const fridgeAccount = await getFridgeAccount(fridgeId);
  const users: UserFridgeType[] = fridgeAccount.userFridges;
  return (
    <>
      <Heading level={1}>冷蔵庫アカウント管理</Heading>
      <div className="md:flex md:gap-7 max-md:space-y-6">
        <Box variant="rounded" className="flex-1/2">
          <Heading level={3} className="text-center">
            アカウント情報
          </Heading>
          <div>
            <Label className="font-bold">冷蔵庫アカウントID</Label>
            <Paragraph>{fridgeAccount.id}</Paragraph>
          </div>
          <div>
            <Label className="font-bold">冷蔵庫アカウント名</Label>
            <Paragraph>{fridgeAccount.name}</Paragraph>
          </div>
          <div>
            <Label className="font-bold">冷蔵庫アカウントの説明</Label>
            <Paragraph>{fridgeAccount.description}</Paragraph>
          </div>
          <Button color="primary" className="block mx-auto w-45">
            編集
          </Button>
        </Box>
        <Box variant="rounded" className="flex-1/2">
          <Heading level={3} className="text-center">
            メンバー
          </Heading>
          <MemberList fridgeId={fridgeId} users={users} />
          <MemberRegistration fridgeId={fridgeId} />
        </Box>
      </div>
    </>
  );
};

export default FridgePage;
