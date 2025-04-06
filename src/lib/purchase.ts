import { PurchaseType } from "@/types/types";

export const getPurchases = async ( fridgeId:string ): Promise<PurchaseType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch purchases");
  }
  return await res.json();
}