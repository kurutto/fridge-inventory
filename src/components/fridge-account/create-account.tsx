"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";
import { useRouter } from "next/navigation";
import Box from "../ui/box";
import Heading from "../ui/heading";
import Paragraph from "../ui/paragraph";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "必須項目です",
  }),
  description: z.string(),
});
type formType = z.infer<typeof formSchema>;
interface CreateAccountProps{
  userId:string;
}
const CreateAccount = ({userId}:CreateAccountProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: formType) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge/account`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          name: values.name,
          description: values.description,
        }),
      }
    );
    if (!res.ok) {
      const errData = await res.json();
      alert(errData.message);
    } else {
      reset();
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <Box variant="rounded" className="w-lg max-w-full mx-auto">
      <Heading level={3} className="text-center">
        アカウント新規作成
      </Heading>
      <Box variant="spaceY">
        <Box variant="horizontallyForm">
          <Label htmlFor="name" className="w-37">
            冷蔵庫アカウント名
          </Label>
          <div className="sm:flex-1 max-sm:w-full">
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
        <Box variant="horizontallyForm">
          <Label htmlFor="description" className="w-37">
            アカウントの説明
          </Label>
          <Input
            type="text"
            id="description"
            {...register("description")}
            className="sm:flex-1 max-sm:w-full"
          />
        </Box>
      </Box>
      <Button type="submit" color="primary" className="block mx-auto w-45">
        作成
      </Button>
    </Box>
    </form>
  );
};

export default CreateAccount;
