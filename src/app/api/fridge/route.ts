import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, fridgeId, name, amount, dueDate } = await req.json();
    await prisma.shoppingList.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
        name: name,
        amount: amount,
        dueDate: dueDate,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
