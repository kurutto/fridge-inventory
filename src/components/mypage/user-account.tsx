"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Label from "../ui/label";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { UserType } from "@/types/types";
import { useRouter } from "next/navigation";
import Input from "../ui/input";
import DeleteConfirm from "../confirm/delete-confirm";

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
});

type formType = z.infer<typeof formSchema>;
interface UserAccountProps {
  user: UserType;
}
const UserAccount = ({ user }: UserAccountProps) => {
  const { update, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
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
      id: user.id,
      name: user.name || undefined,
    },
  });
  const handleCancel = () => {
    reset({
      id: user.id,
      name: user.name || undefined,
    });
    setIsEdit(false);
  };
  const onSubmit = async (values: formType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: user.id,
            id: values.id,
            name: values.name,
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
        await update({ id: values.id, name: values.name });
        router.refresh();
      }
    } catch (err) {
      console.error("Fetch failed:", err);
      alert(`サーバーエラーが発生しました`);
    }
  };

  const handleDelete = async () => {
    signOut();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}`, {
      method: "DELETE",
    });
    await update({
      id: null,
      name: null,
      email: null,
      fridgeId: null,
      fridgeName: null,
      deleteConfirm: null,
    });
    router.refresh();
    router.push("/signup");
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:space-y-7 max-md:space-y-5"
      >
        <div>
          <Label className="font-bold" htmlFor="id">
            ユーザーID
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
            <Paragraph>{user.id}</Paragraph>
          )}
        </div>
        <div>
          <Label className="font-bold" htmlFor="name">
            ユーザー名
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
            <Paragraph>{user.name}</Paragraph>
          )}
        </div>
        {isEdit && (
          <div className="flex gap-4 justify-center">
            <Button type="submit" color="primary" className="w-30">
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
            onClick={
              session?.user.deleteConfirm === true ? handleOpen : handleDelete
            }
          >
            削除
          </Button>
        </div>
      )}
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={handleOpen}
        confirmText={`${user.name}アカウントを削除しますか？一度削除するとデータは復元できません。`}
        hideNextTime={false}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default UserAccount;
