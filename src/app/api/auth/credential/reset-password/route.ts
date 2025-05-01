import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  invalidOrExpiredTokenMessage,
  invalidTokenMessage,
  serverErrorMessage,
} from "@/constants/apiMessages";

export async function PUT(req: Request) {
  try {
    const { token, password } = await req.json();
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    } catch {
      return NextResponse.json(
        { message: invalidOrExpiredTokenMessage, errorId: "INVALID_TOKEN" },
        { status: 400 }
      );
    }
    const userId = decoded.userId;
    console.log("userIdだよ", userId);
    const hashedPassword = await bcrypt.hash(password, 10);
    const credential = await prisma.credential.findFirst({
      where: { userId: userId },
    });
    console.log("credentialだよ", credential);
    if (!credential) {
      return NextResponse.json(
        { message: invalidTokenMessage, errorId: "INVALID_TOKEN" },
        { status: 400 }
      );
    }

    await prisma.credential.update({
      where: {
        id: credential.id,
      },
      data: {
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json({ status: 201 });
  } catch (err) {
    console.error("GET Error:", err);
    return NextResponse.json({ message: serverErrorMessage }, { status: 500 });
  }
}
