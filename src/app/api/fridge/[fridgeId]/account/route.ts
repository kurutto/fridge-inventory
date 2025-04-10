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
export async function GET(req: Request) {
  try {
    const fridgeId = await req.url.split("fridge/")[1].replace("/account", "");
    const fridgeAccount = await prisma.fridge.findUnique({
      where: { id: fridgeId },
      include: {
        userFridges: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(fridgeAccount);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
