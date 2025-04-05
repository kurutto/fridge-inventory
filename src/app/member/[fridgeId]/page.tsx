import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import {
  FaListUl,
  FaCubesStacked,
  FaBagShopping,
  FaFileLines,
} from "react-icons/fa6";
import AddToListButton from "@/components/shopping-list/add-to-list-button";
import FridgeModal from "@/components/fridge/fridge-modal";
import ShoppingList from "@/components/shopping-list/shopping-list";
import InventoryTable from "@/components/inventory/inventory-table";
import AddInventoryButton from "@/components/inventory/add-inventory-button";
import { getInventories } from "@/lib/inventory";
import { getShoppingList } from "@/lib/shopping-list";
import AddPurchaseButton from "@/components/purchase/add-purchase-button";
import BottomMenu from "@/components/bottom-menu/bottom-menu";

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
        <ShoppingList userId={userId} fridgeId={fridgeId} shoppingList={shoppingList} />
      </Box>
      <FridgeModal userId={userId} fridgeId={fridgeId} />

      <BottomMenu className="md:hidden fixed bottom-0 left-0 w-full" />
    </>
  );
};

export default FridgePage;
