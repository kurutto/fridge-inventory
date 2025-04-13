import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/signin");
  } else if (session.user.id && !session.user.fridgeId) {
    redirect("/member/fridge-account");
  } else if (session.user.fridgeId) {
    redirect(`/member/${session.user.fridgeId}`);
  }

  return (
    <>
      <p>トップページ</p>
    </>
  );
}
