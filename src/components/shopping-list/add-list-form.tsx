import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Box from "../ui/box";
import Button from "../ui/button";
import Heading from "../ui/heading";
import Input from "../ui/input";
import Label from "../ui/label";
import Select from "../ui/select";
import Paragraph from "../ui/paragraph";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "必須項目です",
  }),
  amount: z.string(),
  dueDate: z.string(),
});
type formType = z.infer<typeof formSchema>;
interface AddListFormProps {
  userId: string;
  fridgeId: string;
}

const AddListForm = ({ userId, fridgeId }: AddListFormProps) => {
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
    reset();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge`, {
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
    });
    router.push(`/member/${fridgeId}`);
    router.refresh();
  };
  return (
    <>
      <Heading level={2} className="justify-center">
        買物リスト追加
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box variant="spaceY">
          <Box variant="horizontally">
            <Label htmlFor="name" className="w-12">
              品名<span className="text-destructive">*</span>
            </Label>
            <div className="sm:flex-1">
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

export default AddListForm;
