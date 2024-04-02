import { taskSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { TASK } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body: TASK = await request.json();
  // const validation = taskSchema.safeParse(body);

  // if (!validation.success)
  //   return NextResponse.json(validation.error.errors, { status: 404 });

  const createdTask = await prisma.tASK.create({
    data: {
      title: "title created",
      description: "description created",
      imgUrl: body.imgUrl,
    },
  });

  return NextResponse.json(createdTask, { status: 201 });
}
