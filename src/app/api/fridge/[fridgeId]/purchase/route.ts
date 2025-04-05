import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, fridgeId, inventoryId, name, category, date } =
      await req.json();
    await prisma.purchase.create({
      data: {
        userId: userId,
        fridgeId: fridgeId,
        inventoryId: inventoryId,
        name: name,
        category: category,
        purchaseDate: date,
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
