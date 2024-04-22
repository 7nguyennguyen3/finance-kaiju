import prisma from "@/prisma/client";
import { CATEGORY } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type FinanceData = {
  amount: number;
  category: CATEGORY;
  userEmail?: string;
  credentialsEmail?: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data: FinanceData = {
    amount: body.amount,
    category: body.category,
    ...(body.userEmail && { userEmail: body.userEmail }),
    ...(body.credentialsEmail && { credentialsEmail: body.credentialsEmail }),
  };

  await prisma.finance.create({
    data: data,
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
      OR: [{ userEmail: body.email }, { credentialsEmail: body.email }],
    },
    orderBy: {
      date: "desc",
    },
  });

  return NextResponse.json(records, { status: 200 });
}
