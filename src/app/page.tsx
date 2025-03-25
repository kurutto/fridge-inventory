import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Header from "@/components/header/header";
import BottomMenu from "@/components/bottom-menu/bottom-menu";
import Link from "next/link";
import { FaCubesStacked, FaBagShopping } from "react-icons/fa6";
import Heading from "@/components/ui/heading";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  console.log(session);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full md:px-5 md:py-16 md:max-w-7xl md:mx-auto md:space-y-12 max-md:px-4 max-md:py-6 max-md:space-y-6 max-md:bg-light-gray">
        <Heading level={1} icon={FaBagShopping}>
          購入品登録
        </Heading>
        <Heading level={2} icon={FaCubesStacked} outline={true}>
          購入品登録
        </Heading>
        <Heading level={3} className="text-center">
          入力して登録
        </Heading>
        <Heading level={3}>入力して登録</Heading>
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
