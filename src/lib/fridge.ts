import { FridgeType, UserFridgeType } from "@/types/types";

export const getFridgeAccountUsers = async (
  fridgeId: string
): Promise<UserFridgeType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch fridge accounts");
  }
  return await res.json();
};

export const getFridgeAccount = async (
  fridgeId: string
): Promise<FridgeType> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/account`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch fridge accounts");
  }
  return await res.json();
};
