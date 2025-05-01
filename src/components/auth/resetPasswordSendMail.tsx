"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Heading from "../ui/heading";
import Box from "../ui/box";
import Label from "../ui/label";
import Input from "../ui/input";
import Paragraph from "../ui/paragraph";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { networkErrorMessage } from "@/constants/messages";

const formSchema = z.object({
  userId: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(6, {
      message: "6文字以上で入力してください",
    }),
  email: z
    .string({
      invalid_type_error: "入力値に誤りがります",
    })
    .min(1, { message: "必須項目です" })
    .email({ message: "正しいメールアドレスを入力してください" }),
});
type formType = z.infer<typeof formSchema>;
const ResetPasswordSendMail = () => {
  const router = useRouter();
  const [sendMessage, setSendMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (values: formType) => {
    setSendMessage(`データ送信中・・・`);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/reset-password/send-mail`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: values.userId,
            email: values.email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setSendMessage("");
        setError("root", { message: data.message });
      }
      if (res.ok) {
        router.push("/reset-password/send-mail/complete");
        router.refresh();
      }
    } catch (error) {
      console.error("送信エラー:", error);
      setError("root", { message: networkErrorMessage });
    }
  };

  return (
    <>
      <Paragraph className="max-w-g md:text-center">
        ユーザーIDとメールアドレスを入力してパスワードリセットメールを送信してください。
      </Paragraph>
      <Box variant="roundedMaxMd" className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:space-y-10 max-md:space-y-7"
        >
          <Box variant="spaceY" className="mx-auto sm:max-w-md">
            {errors.root && <Paragraph>{errors.root.message}</Paragraph>}
            <Box variant="horizontallyForm">
              <Label htmlFor="userId" className="sm:w-35">
                ユーザーID<span className="text-destructive">*</span>
              </Label>
              <div className="flex-1">
                <Input
                  type="text"
                  id="userId"
                  {...register("userId")}
                  className="w-full"
                />
                {errors.userId && (
                  <Paragraph variant="error">{errors.userId.message}</Paragraph>
                )}
              </div>
            </Box>
            <Box variant="horizontallyForm">
              <Label htmlFor="email" className="sm:w-35">
                メールアドレス<span className="text-destructive">*</span>
              </Label>
              <div className="flex-1">
                <Input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full"
                />
                {errors.email && (
                  <Paragraph variant="error">{errors.email.message}</Paragraph>
                )}
              </div>
            </Box>
          </Box>
          <Button
            color="primary"
            type="submit"
            className="mt-10 w-48 block mx-auto"
          >
            メールを送信
          </Button>
          {sendMessage && (
            <Paragraph className="text-center">{sendMessage}</Paragraph>
          )}
        </form>
      </Box>
    </>
  );
};

export default ResetPasswordSendMail;
