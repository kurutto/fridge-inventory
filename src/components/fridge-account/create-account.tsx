"use client";
import { useSession } from "next-auth/react";
import { useRef } from "react";
import Button from "../ui/button";
import Input from "../ui/input";
import Label from "../ui/label";
import { useRouter } from "next/navigation";
import Box from "../ui/box";
import Heading from "../ui/heading";

const CreateAccount = () => {
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const { data: session, update } = useSession();
  const handleCreate = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/fridge-account`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: session!.user.id,
          name: nameRef.current!.value,
          description: descriptionRef.current!.value,
        }),
      }
    );
    const data = await res.json();
    const fridgeId = data.fridgeId;
    await update({ fridgeId: fridgeId });
    router.refresh();
  };

  return (
    <Box variant="rounded" className="w-lg max-w-9/10 mx-auto">
      <Heading level={3} className="text-center">
        アカウント新規作成
      </Heading>
      <Box variant="spaceY">
        <Box variant="horizontally">
          <Label htmlFor="name" className="w-37">
            冷蔵庫アカウント名
          </Label>
          <Input
            type="text"
            id="name"
            ref={nameRef}
            className="sm:flex-1 max-sm:w-full"
          />
        </Box>
        <Box variant="horizontally">
          <Label htmlFor="description" className="w-37">
            アカウントの説明
          </Label>
          <Input
            type="text"
            id="description"
            ref={descriptionRef}
            className="sm:flex-1 max-sm:w-full"
          />
        </Box>
      </Box>
      <Button color="primary" className="block mx-auto w-45" onClick={handleCreate}>
        作成
      </Button>
    </Box>
  );
};

export default CreateAccount;
