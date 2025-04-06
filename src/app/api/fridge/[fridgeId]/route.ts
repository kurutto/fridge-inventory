import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const fridgeId = await req.url.split("fridge/")[1];
    const users = await prisma.userFridge.findMany({
      where: { fridgeId: fridgeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(users);
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json(
      { message: "データの取得に失敗しました。" },
      { status: 500 }
    );
  }
}
