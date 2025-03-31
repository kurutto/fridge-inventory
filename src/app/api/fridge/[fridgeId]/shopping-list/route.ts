import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const fridgeId = await req.url
      .split("fridge/")[1]
      .replace("/shopping-list", "");
    const shoppingLists = await prisma.shoppingList.findMany({
      where: { fridgeId: fridgeId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(shoppingLists);
  } catch (err) {
    return NextResponse.json(err);
  }
}
