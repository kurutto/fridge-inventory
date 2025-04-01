"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useEffect, useState } from "react";
import { ModalContext, ModalContextType } from "@/context/modal-context";
import { useRouter } from "next/navigation";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Select from "../ui/select";
import { categories } from "@/constants/categories";
import { InventoryType } from "@/types/types";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  category: z.string().min(1, {
    message: "必須項目です",
  }),
  name: z.string().min(1, {
    message: "必須項目です",
  }),
  remaining: z.coerce.number({ message: "半角整数で入力してください" }),
});

type formType = z.infer<typeof formSchema>;
interface InventoryFormProps {
  fridgeId: string;
  inventory?: InventoryType | null;
}

const InventoryForm = ({ fridgeId, inventory }: InventoryFormProps) => {
  const { handleOpen } = useContext<ModalContextType>(ModalContext);
  const router = useRouter();
  const [category, setCategory] = useState(inventory?.category || 0);
  const [name, setName] = useState(inventory?.name || "");
  const [remaining, setRemaining] = useState(
    inventory?.remaining.toString() || "0"
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: formType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`,
        {
          method: inventory ? "PUT" : "POST",
          body: JSON.stringify({
            fridgeId: fridgeId,
            inventoryId: inventory?.id,
            category: Number(values.category),
            name: values.name,
            amount: values.remaining,
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
        handleOpen();
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };

  const handleDelete = async() => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory/${inventory!.id}`,
      {
        method: "DELETE",
      }
    );
    reset();
    router.refresh();
    handleOpen();
  }
  return (
    <>
      <Heading level={2} className="justify-center">
        {inventory ? "在庫管理編集" : "在庫管理追加"}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="category" className="w-20">
              カテゴリ<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Select
                id="category"
                value={category}
                {...register("category")}
                onChange={(e) => setCategory(Number(e.target.value))}
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
              品名<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Input
                type="text"
                id="name"
                value={name}
                {...register("name")}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
              />
              {errors.name && (
                <Paragraph variant="error">{errors.name.message}</Paragraph>
              )}
            </div>
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="remaining" className="w-20">
              残数<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Input
                type="text"
                id="remaining"
                value={remaining}
                {...register("remaining")}
                onChange={(e) => setRemaining(e.target.value)}
                className="w-36"
              />
              {errors.remaining && (
                <Paragraph variant="error">
                  {errors.remaining.message}
                </Paragraph>
              )}
            </div>
          </Box>
        </Box>
        <Box variant="horizontally" className=" md:mt-8 max-md:mt-6 justify-center">
          <Button type="submit" color="primary" className={cn('block',inventory ? 'w-30':'w-45')}>
            送信
          </Button>
          {inventory && (
            <Button type="button" color="secondary" className="block w-30" onClick={handleDelete}>
              削除
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};

export default InventoryForm;
