import { getServerSession } from "next-auth";
import PurchasesList from "@/components/purchase/purchases-list";
import { getPurchases } from "@/lib/purchase";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/lib/next-auth/options";
import Heading from "@/components/ui/heading";
import {
  FaFileLines,
} from "react-icons/fa6";
import Box from "@/components/ui/box";
import { getFridgeAccountUsers } from "@/lib/fridge";
import { PurchaseType } from "@/types/types";


const PurchasesPage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const purchases = await getPurchases(fridgeId);
  const sortedPurchases:PurchaseType[] = [...purchases];
  sortedPurchases.sort((first, second) => {
    if (first.purchaseDate > second.purchaseDate) {
      return -1;
    } else if (second.purchaseDate > first.purchaseDate) {
      return 1;
    } else {
      return 0;
    }
  });
  const fridgeAccountUsers = await getFridgeAccountUsers(fridgeId);
  return (
    <>
    <Heading level={1} icon={FaFileLines}>購入履歴</Heading>
    <Box variant="rounded" className="md:max-w-xl md:mx-auto">
      <PurchasesList userId={userId} fridgeId={fridgeId} purchases={sortedPurchases} users={fridgeAccountUsers} />
    </Box>
    </>
  )
}

export default PurchasesPage