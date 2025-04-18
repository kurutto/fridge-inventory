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

const formSchema = z.object({
  name: z.string().min(1, {
    message: "必須項目です",
  }),
  amount: z.string(),
  dueDate: z.string(),
});

type formType = z.infer<typeof formSchema>;
interface AddToListFormProps {
  userId: string;
  fridgeId: string;
}

const AddToListForm = ({ userId, fridgeId }: AddToListFormProps) => {
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
      name: "",
    },
  });
  const onSubmit = async (values: formType) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/fridge/${fridgeId}/shopping-list`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: userId,
            fridgeId: fridgeId,
            name: values.name,
            amount: values.amount,
            dueDate: new Date(values.dueDate),
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
  return (
    <>
      <Heading level={2} className="justify-center mb-8">
        買物リスト追加
      </Heading>
      {isAdded && <Paragraph className="text-center">{isAdded}</Paragraph>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-12">
              品名<span className="text-destructive">*</span>
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
            <Label htmlFor="amount" className="w-12">
              数量
            </Label>
            <Input
              type="text"
              id="amount"
              {...register("amount")}
              className="w-36"
            />
          </Box>
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-12">
              期限日
            </Label>
            <Input type="date" id="date" {...register("dueDate")} />
          </Box>
        </Box>
        <Button
          type="submit"
          color="primary"
          className="block mx-auto w-45 md:mt-8 max-md:mt-6"
        >
          送信
        </Button>
      </form>
    </>
  );
};

export default AddToListForm;
