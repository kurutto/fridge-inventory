"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  email: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .email({ message: "正しいメールアドレスを入力してください" }),
  password: z
    .string({
      required_error: "必須項目です",
      invalid_type_error: "入力値に誤りがります",
    })
    .regex(/^[a-zA-Z0-9]+$/, { message: "半角英数字で入力してください" })
    .min(8, {
      message: "8文字以上で入力してください",
    }),
});
type formType = z.infer<typeof formSchema>;

const CredentialSignup = () => {
  const [sendMessage, setSendMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: formType) => {
    setSendMessage(`データ送信中・・・`);
    setResponseMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: values.id,
            name: values.name,
            email: values.email,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        if (data.errorId === "INVALID_ID") {
          setSendMessage("");
          setError("id", { message: data.message });
        } else if (data.errorId === "INVALID_EMAIL") {
          setSendMessage("");
          setError("email", { message: data.message });
        } else {
          setSendMessage("");
          setError("root", { message: "サインアップに失敗しました" });
        }
      }
      if (res.ok) {
        setSendMessage("");
        setResponseMessage(data.message);
      }
    } catch {
      setError("root", { message: "サーバーエラーが発生しました" });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && <p>{errors.root.message}</p>}
        <div>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" {...register("id")} />
          {errors.id && <p>{errors.id.message}</p>}
        </div>
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input type="text" id="name" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" className="mt-10 w-48 block mx-auto">
          新規作成
        </button>
      </form>
      {sendMessage && <p>{sendMessage}</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export { CredentialSignup };
