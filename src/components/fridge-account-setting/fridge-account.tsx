"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { FridgeType } from "@/types/types";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  id: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(6, {
      message: "6文字以上で入力してください",
    }),
  name: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .min(2, {
      message: "2文字以上で入力してください",
    }),
  description: z.string(),
});

type formType = z.infer<typeof formSchema>;
interface FridgeAccountProps {
  fridgeAccount: FridgeType;
}
const FridgeAccount = ({ fridgeAccount }: FridgeAccountProps) => {
  const { update } = useSession();
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: fridgeAccount.id,
      name: fridgeAccount.name,
      description: fridgeAccount.description,
    },
  });
  const handleCancel = () => {
    reset({
      id: fridgeAccount.id,
      name: fridgeAccount.name,
      description: fridgeAccount.description,
    });
    setIsEdit(false);
  };
  const onSubmit = async (values: formType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeAccount.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            fridgeId: fridgeAccount.id,
            id: values.id,
            name: values.name,
            description: values.description,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        if (data.errorId === "INVALID_ID") {
          setError("id", {
            type: "server",
            message: "このIDはすでに使われています",
          });
        } else {
          const errData = await res.json();
          alert(errData.message);
        }
      } else {
        setIsEdit(false);
        router.refresh();
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };
  const handleDelete = async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeAccount.id}`,
      {
        method: "DELETE",
      }
    );
    await update({ fridgeId: null, fridgeName: null });
    router.refresh();
    router.push("/member/fridge-account");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:space-y-7 max-md:space-y-5"
      >
        <div>
          <Label className="font-bold" htmlFor="id">
            冷蔵庫アカウントID
          </Label>
          {isEdit ? (
            <div>
              <Input
                type="text"
                id="id"
                {...register("id")}
                className="w-full"
              />
              {errors.id && (
                <Paragraph variant="error">{errors.id.message}</Paragraph>
              )}
            </div>
          ) : (
            <Paragraph>{fridgeAccount.id}</Paragraph>
          )}
        </div>
        <div>
          <Label className="font-bold" htmlFor="name">
            冷蔵庫アカウント名
          </Label>
          {isEdit ? (
            <div>
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
          ) : (
            <Paragraph>{fridgeAccount.name}</Paragraph>
          )}
        </div>
        <div>
          <Label className="font-bold">冷蔵庫アカウントの説明</Label>
          {isEdit ? (
            <div>
              <Input
                type="text"
                id="description"
                {...register("description")}
                className="w-full"
              />
            </div>
          ) : (
            <Paragraph>{fridgeAccount.description}</Paragraph>
          )}
        </div>
        {isEdit && (
          <div className="flex gap-4 justify-center">
            <Button type="submit" color="outline" className="w-30">
              送信
            </Button>
            <Button
              type="button"
              color="secondary"
              className="w-30"
              onClick={handleCancel}
            >
              キャンセル
            </Button>
          </div>
        )}
      </form>
      {!isEdit && (
        <div className="flex gap-4 justify-center">
          <Button
            type="button"
            color="outline"
            className="w-30"
            onClick={() => setIsEdit(true)}
          >
            編集
          </Button>
          <Button
            type="button"
            color="destructive"
            className="w-30"
            onClick={handleDelete}
          >
            削除
          </Button>
        </div>
      )}
    </>
  );
};

export default FridgeAccount;
