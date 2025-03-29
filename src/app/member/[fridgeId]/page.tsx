import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
const FridgePage = async ({ params }: { params: { fridgeId: string } }) => {
  const session = await getServerSession(nextAuthOptions);
  if (params.fridgeId !== session?.user.fridgeId) {
    redirect("/member/fridge-account");
  }
  return <div>page</div>;
};

export default FridgePage;
