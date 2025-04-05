import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fridgeId, category, name, kana, amount } = await req.json();
    await prisma.inventory.create({
      data: {
        fridgeId: fridgeId,
        category: category,
        name: name,
        kana: kana,
        remaining: amount,
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

export async function PUT(req: Request) {
  try {
    const { fridgeId, inventoryId, category, name, kana, amount } =
      await req.json();
    await prisma.inventory.update({
      where: {
        fridgeId: fridgeId,
        id: inventoryId,
      },
      data: {
        category: category,
        name: name,
        kana: kana,
        remaining: amount,
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
export async function GET(req: Request) {
  try {
    const fridgeId = await req.url
      .split("fridge/")[1]
      .replace("/inventory", "");
    const inventories = await prisma.inventory.findMany({
      where: { fridgeId: fridgeId },
    });
    return NextResponse.json(inventories);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
