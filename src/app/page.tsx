import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Header from "@/components/header/header";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  console.log(session);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 md:px-5 md:py-16 md:max-w-7xl md:mx-auto max-md:px-4 max-md:py-6 max-md:bg-light-gray">
        {session ? (
          <a href="/api/auth/signout">ログアウト</a>
        ) : (
          <a href="/signin">ログイン</a>
        )}
      </main>
    </div>
  );
}
