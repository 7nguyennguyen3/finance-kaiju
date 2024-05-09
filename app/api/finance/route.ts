import prisma from "@/prisma/client";
import { CATEGORY } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

type FinanceData = {
  amount: number;
  category: CATEGORY;
  description?: string;
  userEmail?: string;
  credentialsEmail?: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  const data: FinanceData = {
    amount: body.amount,
    category: body.category,
    description: body.description,
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

export async function DELETE(request: NextRequest) {
  const body = await request.json();

  await prisma.finance.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json(
    { message: "Record has been successfully deleted." },
    { status: 201 }
  );
}
export async function PATCH(request: NextRequest) {
  const body = await request.json();

  await prisma.finance.update({
    where: {
      id: body.id,
    },
    data: {
      amount: body.amount,
      category: body.category,
      description: body.description,
    },
  });

  return NextResponse.json({ message: "Record has been updated!" });
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
