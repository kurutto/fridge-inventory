import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const inventoryId = req.url.split("inventory/")[1];
    await prisma.inventory.delete({
      where: {
        id: inventoryId,
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
