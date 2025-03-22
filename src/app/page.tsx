import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Header from "@/components/header/header";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  console.log(session);
  return (
    <div>
      <Header />
      <main>
        {session ? (
          <a href="/api/auth/signout">ログアウト</a>
        ) : (
          <a href="/signin">ログイン</a>
        )}
      </main>
    </div>
  );
}
