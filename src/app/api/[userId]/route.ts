import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const userId = req.url.split("/api/")[1];
  try {
    const fridges = await prisma.fridge.findMany({
      where: {userFridges: {some: {userId: userId}}}
    });
    return NextResponse.json(fridges);
  } catch (err) {
    return NextResponse.json(err);
  }
}
