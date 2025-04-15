import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { fridgeId, id, name, description } = await req.json();
    const fridge = await prisma.fridge.findFirst({ where: { id: id } });
    if (fridge && fridgeId !== id) {
      return NextResponse.json(
        { message: "このIDは既に登録されています", errorId: "INVALID_ID" },
        { status: 400 }
      );
    }
    await prisma.fridge.update({
      where: {
        id: fridgeId,
      },
      data: {
        id: id,
        name: name,
        description: description,
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
                id: true,
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

export async function DELETE(req: Request) {
  try {
    const fridgeId = req.url.split("fridge/")[1];
    await prisma.fridge.delete({
      where: {
        id: fridgeId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
