import { goalSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { GOAL } from "@prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const goals = await prisma.gOAL.findMany();
  return NextResponse.json(goals);
}

export async function POST(request: NextRequest) {
  const body: GOAL = await request.json();
  const validation = goalSchema.safeParse(body);

  const { title, description } = body;

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const createdGoal = await prisma.gOAL.create({
    data: {
      title,
      description,
    },
  });

  return NextResponse.json(createdGoal, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {}
