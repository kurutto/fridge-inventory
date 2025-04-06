import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const itemId = req.url.split("purchase/")[1];
    await prisma.purchase.delete({
      where: {
        id: itemId,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 201 });
  } catch (err) {
    return NextResponse.json(err);
  }
}
