import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const records = await prisma.finance.findMany({});

  return NextResponse.json(records);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();

  const records = await prisma.finance.findMany({
    where: {
      credentialsEmail: body.credentialsEmail,
    },
  });

  return NextResponse.json(records, { status: 200 });
}
