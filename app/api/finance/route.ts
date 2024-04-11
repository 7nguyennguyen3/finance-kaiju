import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  await prisma.finance.create({
    data: {
      amount: body.amount,
      category: body.category,
      credentialsEmail: body.credentialsEmail,
    },
  });

  return NextResponse.json(
    { message: "Record has been successfully registered." },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const records = await prisma.finance.findMany({
    where: {
      credentialsEmail: body.credentialsEmail,
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(records, { status: 200 });
}
