import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const ids = req.url.split("fridge/")[1].split("/account/");
    const fridgeId = ids[0];
    const userId = ids[1];
    console.log("ids", ids);
    await prisma.userFridge.delete({
      where: {
        userId_fridgeId: {
          userId: userId,
          fridgeId: fridgeId,
        },
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    console.error("DELETE Error:", err);
    return NextResponse.json(
      { message: "データの削除に失敗しました。" },
      { status: 500 }
    );
  }
}
