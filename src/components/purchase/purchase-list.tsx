import { PurchaseType, UserFridgeType } from "@/types/types";
import { List, Li } from "../ui/list";
import Heading from "../ui/heading";
import RemovePurchaseButton from "./remove-purchase-button";

interface PurchaseListProps {
  userId: string;
  fridgeId: string;
  date:Date;
  purchases: PurchaseType[];
  users: UserFridgeType[]
  headingStyle:string;
}

const PurchaseList = ({
  userId,
  fridgeId,
  date,
  purchases,
  users,
  headingStyle,
}: PurchaseListProps) => {
  const datePurchases = purchases.filter(purchase => new Date(purchase.purchaseDate).toLocaleDateString() === date.toLocaleDateString())

  return (
    <>
    {users.map(user => (
      datePurchases.some(datePurchase => datePurchase.userId === user.userId) ? (
        <div key={user.userId}>
          <Heading level={3} className={headingStyle}>
            {user.user.name}
          </Heading>
          <List className="mt-2.5">
            {datePurchases.map(
              (purchase) =>
                purchase.userId === user.userId && (
                  <Li key={purchase.id} className="relative pr-4 pt-3">
                    ・{purchase.name}
                    {user.userId === userId && (
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
        ):null
      ))}
    </>
  );
};

export default PurchaseList;
