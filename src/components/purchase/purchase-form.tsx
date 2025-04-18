"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { ModalContext, ModalContextType } from "@/context/modal-context";
import { useRouter, usePathname } from "next/navigation";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Select from "../ui/select";
import { categories } from "@/constants/categories";
import { InventoryType } from "@/types/types";
import { getInventories } from "@/lib/inventory";

interface PurchaseFormProps {
  userId: string;
  fridgeId: string;
}

const PurchaseForm = ({ userId, fridgeId }: PurchaseFormProps) => {
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const router = useRouter();
  const pathname = usePathname();
  const [isAdded, setIsAdded] = useState("");
  const [inventoryCheck, setInventoryCheck] = useState(false);
  const [inventories, setInventories] = useState<InventoryType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const data = await getInventories(fridgeId);
      setInventories(data);
    };
    getData();
  }, []);

  const formSchema = z.object({
    name: z.string().min(1, {
      message: "必須項目です",
    }),
    category: z.string().min(1, {
      message: "必須項目です",
    }),
    date: z.string(),
    inventoryId: inventoryCheck
      ? z.string().min(1, {
          message: "必須項目です",
        })
      : z.string(),
    amount: z.coerce.number({ message: "半角整数で入力してください" }),
  });

  type formType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      amount: 0,
    },
  });
  const onSubmit = async (values: formType) => {
    try {
      if (inventoryCheck && inventories.length > 0) {
        const targetInventory = inventories?.filter(
          (inventory) => inventory.id === values.inventoryId
        );
        const amount =
          targetInventory && targetInventory[0]?.remaining + values.amount;
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`,
            {
              method: "PUT",
              body: JSON.stringify({
                fridgeId: fridgeId,
                inventoryId: values.inventoryId,
                amount: amount,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!res.ok) {
            const errData = await res.json();
            alert(errData.message);
          }
        } catch (err) {
          console.error("Fetch failed:", err);
          alert(`サーバーエラーが発生しました`);
        }
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/purchase`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            fridgeId: fridgeId,
            inventoryId: inventoryCheck ? values.inventoryId : null,
            name: values.name,
            category: Number(values.category),
            date: new Date(values.date),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        const errData = await res.json();
        alert(errData.message);
      } else {
        reset();
        router.refresh();
        if (
          pathname.split(`${fridgeId}/`)[1] &&
          pathname.split(`${fridgeId}/`)[1] !== "purchases"
        ) {
          setIsAdded(`${values.name}が追加されました`);
          setTimeout(() => {
            handleOpen();
          }, 1500);
        } else {
          handleOpen();
        }
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        購入品追加
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-20">
              品名<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="flex-1">
              <Input
                type="text"
                id="name"
                {...register("name")}
                className="w-full"
              />
              {errors.name && (
                <Paragraph variant="error">{errors.name.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="category" className="w-20">
              カテゴリ<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Select
                id="category"
                {...register("category")}
                className="flex-1"
              >
                {categories.map((category, idx) => (
                  <option value={idx} key={idx}>
                    {category}
                  </option>
                ))}
              </Select>
              {errors.category && (
                <Paragraph variant="error">{errors.category.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-20">
              購入日
            </Label>
            <Input type="date" id="date" {...register("date")} />
          </Box>
          {inventories.length > 0 && (
            <Box variant="horizontally" className="items-center">
              <Label htmlFor="inventoryCheck">在庫管理に追加</Label>
              <Input
                type="checkbox"
                id="inventoryCheck"
                checked={inventoryCheck}
                onChange={() => setInventoryCheck((prev) => !prev)}
              />
            </Box>
          )}

          <>
            <Box
              variant="horizontally"
              className={inventoryCheck ? "" : "hidden"}
            >
              <Label htmlFor="inventoryId" className="sm:w-20">
                在庫管理名
              </Label>
              <div>
                <Select
                  id="inventoryId"
                  {...register("inventoryId")}
                  className="flex-1"
                >
                  {inventories?.map((inventory, idx) => (
                    <option value={inventory.id} key={idx}>
                      {inventory.name}({categories[inventory.category]})
                    </option>
                  ))}
                </Select>
              </div>
            </Box>
            <Box
              variant="horizontally"
              className={inventoryCheck ? "" : "hidden"}
            >
              <Label htmlFor="amount" className="w-20">
                追加数量<span className="text-destructive pl-0.5">*</span>
              </Label>
              <div className="flex-1">
                <Input
                  type="text"
                  id="amount"
                  {...register("amount")}
                  className="w-36"
                />
                {errors.amount && (
                  <Paragraph variant="error">{errors.amount.message}</Paragraph>
                )}
              </div>
            </Box>
          </>
        </Box>
        <Box
          variant="horizontally"
          className="md:mt-8 max-md:mt-6 justify-center"
        >
          <Button type="submit" color="primary" className="w-45">
            送信
          </Button>
        </Box>
      </form>
    </>
  );
};

export default PurchaseForm;
