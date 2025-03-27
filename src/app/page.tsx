import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Header from "@/components/header/header";
import BottomMenu from "@/components/bottom-menu/bottom-menu";
import Link from "next/link";
import { FaCubesStacked, FaBagShopping } from "react-icons/fa6";
import Heading from "@/components/ui/heading";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import Label from "@/components/ui/label";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableData,
} from "@/components/ui/table";
import Box from "@/components/ui/box";

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
        <Heading level={2} outline={true}>
          button
        </Heading>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>baseボタン</Heading>
          <Button color="primary">primary color</Button>
          <Button color="secondary">secondary color</Button>
          <Button color="destructive">destructive color</Button>
        </div>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>smallボタン</Heading>
          <Button variant="small" color="secondary">
            テスト
          </Button>
        </div>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>addボタン</Heading>
          <Button variant="add" color="primary" />
        </div>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>deleteボタン</Heading>
          <Button variant="delete" />
        </div>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>photoボタン</Heading>
          <Button variant="photo" color="primary" />
        </div>
        <Heading level={2} outline={true}>
          form
        </Heading>
        <div className="space-x-4 space-y-5">
          <div className="flex items-center space-x-4">
            <Label htmlFor="name" className="w-28">
              品名
            </Label>
            <Input type="text" id="name" className="flex-1" />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="date" className="w-28">
              購入日
            </Label>
            <Input type="date" id="date" className="flex-1" />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="category" className="w-28">
              カテゴリ
            </Label>
            <Select
              options={["食品", "日用品", "非常用品"]}
              id="category"
              className="flex-1"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Label htmlFor="inventory" className="w-28">
              在庫管理登録
            </Label>
            <Input type="checkbox" id="inventory" />
          </div>
        </div>
        <div className="space-x-4 space-y-4">
          <Heading level={3}>小さいサイズ</Heading>
          <Select
            options={["1", "1/2", "1/4", "少", "備蓄を挿入"]}
            padding="small"
          />
          <Input type="text" padding="small" />
        </div>
        <Heading level={2} outline={true}>
          table
        </Heading>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader className="text-left">品名</TableHeader>
              <TableHeader className="w-20">残数</TableHeader>
              <TableHeader className="w-24"></TableHeader>
            </TableRow>
          </TableHead>
          <TableBody className="max-h-30">
            <TableRow>
              <TableData>品名</TableData>
              <TableData className="text-center">1</TableData>
              <TableData className="text-center">
                <Button variant="small" color="secondary" className="w-20">
                  編集
                </Button>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData>品名</TableData>
              <TableData className="text-center">1</TableData>
              <TableData className="text-center">
                <Button variant="small" color="secondary" className="w-20">
                  編集
                </Button>
              </TableData>
            </TableRow>
            <TableRow>
              <TableData>品名</TableData>
              <TableData className="text-center">1</TableData>
              <TableData className="text-center">
                <Button variant="small" color="secondary" className="w-20">
                  編集
                </Button>
              </TableData>
            </TableRow>
          </TableBody>
        </Table>
        <Box variant="rounded">
          boxです
        </Box>
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
