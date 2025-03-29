import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";

const FridgePage = async ({
  params,
}: {
  params: Promise<{ fridgeId: string }>;
}) => {
  const { fridgeId } = await params;
  const session = await getServerSession(nextAuthOptions);
  if (fridgeId !== session?.user.fridgeId) {
    redirect("/member/fridge-account");
  }
  return <div>page</div>;
};

export default FridgePage;
