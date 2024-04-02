-- CreateTable
CREATE TABLE "TASK" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "STATUS" NOT NULL DEFAULT 'INCOMPLETE',
    "imgUrl" TEXT NOT NULL,

    CONSTRAINT "TASK_pkey" PRIMARY KEY ("id")
);
