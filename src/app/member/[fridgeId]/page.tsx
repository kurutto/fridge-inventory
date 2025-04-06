import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import {
  FaListUl,
  FaCubesStacked,
  FaBagShopping,
} from "react-icons/fa6";
import AddToListButton from "@/components/shopping-list/add-to-list-button";
import ShoppingList from "@/components/shopping-list/shopping-list";
import InventoryTable from "@/components/inventory/inventory-table";
import AddInventoryButton from "@/components/inventory/add-inventory-button";
import { getInventories } from "@/lib/inventory";
import { getShoppingList } from "@/lib/shopping-list";
import AddPurchaseButton from "@/components/purchase/add-purchase-button";
import { getPurchases } from "@/lib/purchase";
import PurchaseList from "@/components/purchase/purchase-list";
import { PurchaseType } from "@/types/types";
import { getFridgeAccountUsers } from "@/lib/fridge";

const FridgePage = async () => {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const fridgeId = session.user.fridgeId;
  if (!fridgeId) {
    redirect("/fridge-account");
  }
  const shoppingList = await getShoppingList(fridgeId);
  const inventories = await getInventories(fridgeId);
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
  const now = new Date();
  const fridgeAccountUsers = await getFridgeAccountUsers(fridgeId);
  console.log('fridgeAccountUsers',fridgeAccountUsers)
  return (
    <>
      <Box variant="rounded">
        <div className="flex justify-between">
          <Heading level={2} icon={FaListUl}>
            買物リスト
          </Heading>
          <AddToListButton />
        </div>
        <ShoppingList userId={userId} fridgeId={fridgeId} shoppingList={shoppingList} />
      </Box>
      <Box variant="spaceY">
        <Heading outline={true} level={2} icon={FaCubesStacked}>
          <div className="flex justify-between items-center w-full">
            在庫管理
            <AddInventoryButton />
          </div>
        </Heading>
        <InventoryTable inventories={inventories} />
      </Box>

      <Box variant="rounded">
        <div className="flex justify-between">
          <Heading level={2} icon={FaBagShopping}>
            今日の購入品
          </Heading>
          <AddPurchaseButton />
        </div>
        <PurchaseList userId={userId} fridgeId={fridgeId} date={now} purchases={sortedPurchases} users={fridgeAccountUsers} headingStyle="max-md:text-center" />
      </Box>

    </>
  );
};

export default FridgePage;
