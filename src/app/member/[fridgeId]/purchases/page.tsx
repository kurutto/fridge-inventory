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
  const purchasesUsers: { id: string; name: string }[] = [];
  purchases.forEach((purchase, idx) => {
    if (idx === 0 || purchase.userId !== purchases[idx - 1].userId) {
      purchasesUsers.push({ id: purchase.userId, name: purchase.user.name });
    }
  })
  return (
    <>
    <Heading level={1} icon={FaFileLines}>購入履歴</Heading>
    <Box variant="rounded" className="md:max-w-xl md:mx-auto">
      <PurchasesList userId={userId} fridgeId={fridgeId} purchases={purchases} purchasesUsers={purchasesUsers} />
    </Box>
    </>
  )
}

export default PurchasesPage