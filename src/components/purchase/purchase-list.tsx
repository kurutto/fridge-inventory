import { PurchasesUserType, PurchaseType } from "@/types/types";
import { List, Li } from "../ui/list";
import Heading from "../ui/heading";
import RemovePurchaseButton from "./remove-purchase-button";
import Paragraph from "../ui/paragraph";

interface PurchaseListProps {
  userId: string;
  fridgeId: string;
  date:Date;
  purchases: PurchaseType[];
  users: PurchasesUserType[]
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
  const today = new Date()
  const datePurchases = purchases.filter(purchase => new Date(purchase.purchaseDate).toLocaleDateString() === date.toLocaleDateString())

  return (
    <>
    {(date.toLocaleDateString() === today.toLocaleDateString() && datePurchases.length === 0) ? <Paragraph>今日の購入品は登録されていません</Paragraph> : 
      users.map(user => (
      datePurchases.some(datePurchase => datePurchase.userId === user.id) ? (
        <div key={user.id}>
          <Heading level={3} className={headingStyle}>
            {user.name}
          </Heading>
          <List className="mt-2.5">
            {datePurchases.map(
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
        ):null
      ))}
    </>
  );
};

export default PurchaseList;
