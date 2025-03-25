import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Header from "@/components/header/header";
import BottomMenu from "@/components/bottom-menu/bottom-menu";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  console.log(session);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 md:px-5 md:py-16 md:max-w-7xl md:mx-auto max-md:px-4 max-md:py-6 max-md:bg-light-gray">
        {session ? (
          <Link href="/api/auth/signout">ログアウト</Link>
        ) : (
          <Link href="/signin">ログイン</Link>
        )}
      </main>
      <BottomMenu className="md:hidden fixed bottom-0 left-0 w-full" />
    </div>
  );
}
