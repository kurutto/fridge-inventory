"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useContext, useState } from "react";
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
import { InventoryType, KanaDataType } from "@/types/types";
import { cn } from "@/lib/utils";
import { getKana } from "@/lib/inventory";

const formSchema = z.object({
  category: z.coerce.number(),
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
  const [isAdded, setIsAdded] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: inventory?.category || 0,
      name: inventory?.name || "",
      remaining: inventory?.remaining || 0,
    },
  });
  const onSubmit = async (values: formType) => {
    try {
      const kanaData = await getKana(fridgeId, values.name);
      const kanaArr = kanaData.result.word.map((kanaObj: KanaDataType) =>
        kanaObj.furigana ? kanaObj.furigana : kanaObj.surface
      );
      const kana = kanaArr.join("");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory`,
        {
          method: inventory ? "PUT" : "POST",
          body: JSON.stringify({
            fridgeId: fridgeId,
            inventoryId: inventory?.id,
            category: Number(values.category),
            name: values.name,
            kana: kana,
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
        if (pathname.split(`${fridgeId}/`)[1]) {
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

  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/inventory/${
        inventory!.id
      }`,
      {
        method: "DELETE",
      }
    );
    reset();
    router.refresh();
    handleOpen();
  };
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        {inventory ? "在庫管理編集" : "在庫管理追加"}
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="category" className="w-19">
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
            <Label htmlFor="name" className="w-19">
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
            <Label htmlFor="remaining" className="w-19">
              残数<span className="text-destructive pl-0.5">*</span>
            </Label>
            <div className="sm:flex-1">
              <Input
                type="text"
                id="remaining"
                {...register("remaining")}
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
        <Box
          variant="horizontally"
          className=" md:mt-8 max-md:mt-6 justify-center"
        >
          <Button
            type="submit"
            color="primary"
            className={cn("block", inventory ? "w-30" : "w-45")}
          >
            送信
          </Button>
          {inventory && (
            <Button
              type="button"
              color="secondary"
              className="block w-30"
              onClick={handleDelete}
            >
              削除
            </Button>
          )}
        </Box>
      </form>
    </>
  );
};

export default InventoryForm;
