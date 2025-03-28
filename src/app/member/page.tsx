import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";

export default async function FridgePage() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div>
      {session ? <p>{session.user.name}</p> : <p>sessionがありません</p>}
    </div>
  );
}
