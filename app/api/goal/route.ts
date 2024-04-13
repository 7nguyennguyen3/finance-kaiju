import { goalSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { GOAL } from "@prisma/client";
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

export async function PATCH(request: NextRequest) {
  const body: GOAL = await request.json();

  const updatedGoal = await prisma.gOAL.update({
    where: {
      id: body.id,
    },
    data: {
      status: body.status,
    },
  });

  return NextResponse.json(
    { message: "Updated successfully!" },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  const body: GOAL = await request.json();

  await prisma.gOAL.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json(
    { message: "Goal has been deleted" },
    { status: 200 }
  );
}
