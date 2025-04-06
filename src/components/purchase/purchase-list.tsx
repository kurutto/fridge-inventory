import { PurchaseType } from "@/types/types";
import { List, Li } from "../ui/list";
import Heading from "../ui/heading";
import RemovePurchaseButton from "./remove-purchase-button";

interface PurchaseListProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseType[];
}

const PurchaseList = async ({
  userId,
  fridgeId,
  purchases,
}: PurchaseListProps) => {
  const now = new Date();
  const todayPurchases = purchases.filter(purchase => new Date(purchase.purchaseDate).toLocaleDateString() === now.toLocaleDateString())
  const users: { id: string; name: string }[] = [];
  todayPurchases.forEach((purchase, idx) => {
    if (idx === 0 || purchase.userId !== purchases[idx - 1].userId) {
      users.push({ id: purchase.userId, name: purchase.user.name });
    }
  });
  return (
    <>
      {users.map((user) => (
        <div key={user.id}>
          <Heading level={3} className="text-center">
            {user.name}
          </Heading>
          <List className="mt-2.5">
            {todayPurchases.map(
              (purchase) =>
                purchase.userId === user.id && (
                  <Li key={purchase.id} className="relative pr-4 pt-3">
                    ・{purchase.name}
                    {user.id === userId && (
                      <RemovePurchaseButton
                        fridgeId={fridgeId}
                        purchaseId={purchase.id}
                      />
                    )}
                  </Li>
                )
            )}
          </List>
        </div>
      ))}
    </>
  );
};

export default PurchaseList;
