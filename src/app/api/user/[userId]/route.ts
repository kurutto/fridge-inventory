import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.url.split("user/")[1];
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userFridges: {
          include: {
            fridge: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json(err);
  }
}
