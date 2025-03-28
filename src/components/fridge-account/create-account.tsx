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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fridge-account`, {
      method: "POST",
      body: JSON.stringify({
        userId: session!.user.id,
        name: nameRef.current!.value,
        description: descriptionRef.current!.value,
      }),
    });
    const data = await res.json();
    const fridgeId = data.fridgeId;
    await update({ fridgeId: fridgeId });
    router.push(`/member/${fridgeId}`);
  };

  return (
    <Box variant="rounded" className="justify-center md:w-fit md:mx-auto">
      <Heading level={3} className="text-center">アカウント新規作成</Heading>
      <div className="space-y-4">
        <div className="md:flex md:items-center md:space-x-4 md:justify-center max-md:space-y-2">
          <Label htmlFor="name" className="w-48">冷蔵庫アカウント名</Label>
          <Input type="text" id="name" ref={nameRef} className="max-md:w-full" />
        </div>
        <div className="md:flex md:items-center md:space-x-4 md:justify-center max-md:space-y-2">
          <Label htmlFor="description" className="w-48">アカウントの説明</Label>
          <Input type="text" id="description" ref={descriptionRef} className="max-md:w-full" />
        </div>
      </div>
      <div className="text-center">
        <Button color="primary" className="min-w-52" onClick={handleCreate}>
        作成
      </Button>
      </div>
      
    </Box>
  );
};

export default CreateAccount;
