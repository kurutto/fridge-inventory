import { PurchasesUserType, PurchaseType } from "@/types/types";
import React from "react";
import Heading from "../ui/heading";
import PurchaseList from "./purchase-list";

interface PurchasesListProps {
  userId: string;
  fridgeId: string;
  purchases: PurchaseType[];
  users: PurchasesUserType[];
}
const PurchasesList = ({
  userId,
  fridgeId,
  purchases,
  users,
}: PurchasesListProps) => {
  const dates: Date[] = [];
  purchases.forEach((purchase) => {
    if(!dates.some(date => date === purchase.purchaseDate)){
      dates.push(purchase.purchaseDate);
    }
  })
  const sortedDates = [...dates];
  sortedDates.sort((first, second) => {
    if (first > second) {
      return -1;
    } else if (second > first) {
      return 1;
    } else {
      return 0;
    }
  });
  return (
    <>
      {sortedDates.map((date, idx) => (
        <div key={idx}>
          <Heading level={2} className="justify-center md:mb-7 max-md:mb-5">
            {new Date(date).toLocaleDateString()}
          </Heading>
          <PurchaseList
            userId={userId}
            fridgeId={fridgeId}
            date={new Date(date)}
            purchases={purchases}
            users={users}
            headingStyle="text-left"
          />
        </div>
      ))}
    </>
  );
};
export default PurchasesList;
