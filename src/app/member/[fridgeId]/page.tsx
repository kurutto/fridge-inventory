import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/lib/next-auth/options";
import { redirect } from "next/navigation";
import Box from "@/components/ui/box";
import Heading from "@/components/ui/heading";
import { FaListUl,FaCubesStacked,FaBagShopping,FaFileLines } from "react-icons/fa6";
import AddListButton from "@/components/shopping-list/add-list-button";
import FridgeModal from "@/components/fridge/fridge-modal";

const FridgePage = async ({
  params,
}: {
  params: Promise<{ fridgeId: string }>;
}) => {
  const { fridgeId } = await params;
  const session = await getServerSession(nextAuthOptions);
  if (fridgeId !== session?.user.fridgeId) {
    redirect("/member/fridge-account");
  }
  return (
  <div>
    <Box variant="rounded">
      <div className="flex justify-between">
        <Heading level={2} icon={FaListUl}>買物リスト</Heading>
        <AddListButton />
      </div>
    </Box>
    <FridgeModal />
    
  </div>
  )
};

export default FridgePage;
