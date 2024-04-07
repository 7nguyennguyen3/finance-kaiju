import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const hashedPassword = await bcrypt.hash(body.password, 10);

  const user = await prisma.credentials.create({
    data: {
      name: body.name,
      email: body.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(
    {
      message: `Hello ${user.name}! Your account has been successfully created!`,
    },
    { status: 201 }
  );
}
