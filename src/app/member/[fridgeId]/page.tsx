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
  return (
    <div>
      <Box variant="rounded">
        <div className="flex justify-between">
          <Heading level={2} icon={FaListUl}>
            買物リスト
          </Heading>
          <AddToListButton />
        </div>
        <ShoppingList userId={userId} fridgeId={fridgeId} />
      </Box>
      <FridgeModal userId={userId} fridgeId={fridgeId} />
    </div>
  );
};

export default FridgePage;
