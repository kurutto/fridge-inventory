import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";

const page = async() => {
  const session = await getServerSession(nextAuthOptions);
  console.log(session?.user.fridgeId);
  return (
    <div>page</div>
  )
}

export default page