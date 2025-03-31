import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const itemId = req.url.split("shopping-list/")[1];
    await prisma.shoppingList.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
