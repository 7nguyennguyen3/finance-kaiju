import { taskSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { TASK } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: TASK = await request.json();
  const validation = taskSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 404 });

  const createdTask = await prisma.tASK.create({
    data: {
      title: body.title,
      description: body.description,
      imgUrl: body.imgUrl,
      status: body.status,
    },
  });

  return NextResponse.json(createdTask, { status: 201 });
}

export async function GET(request: NextRequest) {
  const tasks = await prisma.tASK.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(tasks, { status: 200 });
}
