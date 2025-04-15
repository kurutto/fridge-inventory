import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId,fridgeId } = await req.json();
    await prisma.userFridge.create({
      data: {
        userId: userId,
        fridgeId: fridgeId
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { message: "データの送信に失敗しました。" },
      { status: 500 }
    );
  }
}