import { PurchasesUserType, PurchaseType } from "@/types/types";

export const getPurchases = async ( fridgeId:string ): Promise<PurchaseType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch purchases");
  }
  return await res.json();
}

export const getPurchasesUsers = (purchases:PurchaseType[]) => {
  const sortedPurchasesByUser: PurchaseType[] = [...purchases];
  sortedPurchasesByUser.sort((first, second) => {
    if (first.userId > second.userId) {
      return -1;
    } else if (second.userId > first.userId) {
      return 1;
    } else {
      return 0;
    }
  });
  const users: PurchasesUserType[] = [];
  sortedPurchasesByUser.forEach((purchase, idx) => {
    if (idx === 0 || purchase.userId != sortedPurchasesByUser[idx - 1].userId) {
      users.push({ id: purchase.userId, name: purchase.user.name });
    }
  });
  return users;

}