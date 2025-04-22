import { getInventories } from "@/lib/inventory";
import { InventoryType } from "@/types/types";
import { useContext, useEffect, useState } from "react";
import { formType } from "../purchaseForm";
import { putData } from "@/lib/putData";
import { useCreateData } from "@/hooks/useCreateDataFromModal";
import { ModalContext, ModalContextType } from "@/context/modalContext";

const useAddPurchase = (fridgeId: string) => {
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  const { isAdded, createItem } = useCreateData();

  useEffect(() => {
    const getData = async () => {
      const data = await getInventories(fridgeId);
      setInventories(data);
    };
    getData();
  }, []);

  const addPurchase = async (
    inventoryCheck: boolean,
    values: formType,
    reset: () => void,
    userId: string
  ) => {
    //選択された在庫管理品の数量を取得、入力値をプラスして合計を算出する
    if (inventoryCheck && inventories.length > 0) {
      const targetInventory = inventories.filter(
        (inventory) => inventory.id === values.inventoryId
      );
      const amount =
        targetInventory && targetInventory[0]?.remaining + values.amount;

      //算出された値をデータベースに格納する
      try {
        await putData(`/fridge/${fridgeId}/inventory`, {
          fridgeId: fridgeId,
          inventoryId: values.inventoryId,
          amount: amount,
        });
      } catch (err) {
        console.error("Fetch failed:", err);
        alert(`サーバーエラーが発生しました`);
      }
    }

    //新規購入品をデータベースに格納する
    createItem(
      `/fridge/${fridgeId}/purchase`,
      {
        userId: userId,
        fridgeId: fridgeId,
        inventoryId: inventoryCheck ? values.inventoryId : null,
        name: values.name,
        category: Number(values.category),
        date: new Date(values.date),
      },
      reset,
      fridgeId,
      values.name,
      handleOpen
    );
  };

  return { isAdded, inventories, addPurchase };
};

export default useAddPurchase;
