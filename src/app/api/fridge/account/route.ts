import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createId } from "@paralleldrive/cuid2";
export async function POST(req: Request) {
  const { userId, name, description } = await req.json();
  try {
    const fridgeId = createId();
    await prisma.fridge.create({
      data: {
        id: fridgeId,
        name: name,
        description: description,
      },
    });
    await prisma.userFridge.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
      },
    });

    return NextResponse.json(
      { message: "Success", fridgeId: fridgeId },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
