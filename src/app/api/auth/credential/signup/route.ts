import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { createId } from "@paralleldrive/cuid2";

export async function POST(req: Request) {
  try {
    const { userId, name, email, password } = await req.json();

    const checkId = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (checkId) {
      return NextResponse.json(
        { message: "このIDは既に登録されています", errorId: "INVALID_ID" },
        { status: 400 }
      );
    }
    const checkEmail = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkEmail) {
      return NextResponse.json(
        {
          message: "このメールアドレスは既に登録されています",
          errorId: "INVALID_EMAIL",
        },
        { status: 400 }
      );
    }

    const id = createId();
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.credential.create({
      data: {
        id: id,
        hashedPassword: hashedPassword,
      },
    });

    const paylodad = { id, userId, name, email };
    const token = jwt.sign(paylodad, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST!,
      port: process.env.EMAIL_PORT!,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    } as nodemailer.TransportOptions);

    const verificationUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/credential/signup/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "【重要】メールアドレスの認証を完了してください",
      text: `${name}様\n\nこのたびはFridgeInventoryにご登録いただき、誠にありがとうございます。\n 登録を完了するには、以下のリンクをクリックしてメールアドレスの認証を行ってください。\n\n▼メールアドレスの認証\n${verificationUrl}\n\n※このリンクの有効期限は1時間です。\n※本メールにお心当たりのない場合は、お手数ですが破棄してください。\n\n今後ともFridgeInventoryをよろしくお願いいたします。  `,
    });

    return NextResponse.json(
      { message: "確認メールを送信しました" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "サーバーエラー", err },
      { status: 500 }
    );
  }
}
