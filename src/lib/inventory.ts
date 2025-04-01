import { InventoryType } from "@/types/types";

export const getInventories = async (fridgeId: string): Promise<InventoryType[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch inventories");
  }
  return await res.json();

};
