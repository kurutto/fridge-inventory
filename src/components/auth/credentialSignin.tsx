"use client";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  id: z.string().min(1, { message: "必須項目です" }),
  password: z.string().min(1, { message: "必須項目です" }),
});
type formType = z.infer<typeof formSchema>;

const CredentialSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      password: "",
    },
  });
  const onSubmit = async (values: formType) => {
    await signIn("credentials", {
      id: values.id,
      password: values.password,
      callbackUrl: "/",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors.root && (
          <p>{errors.root.message}</p>
        )}
        <div>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" {...register("id")} />
          {errors.id && (
            <p>{errors.id.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" {...register("password")} />
          {errors.password && (
            <p>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className="mt-10 w-48 block mx-auto">
          ログイン
        </button>
      </form>
    </div>
  );
};

export { CredentialSignin };
