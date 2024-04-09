/*
  Warnings:

  - You are about to drop the column `credentialsId` on the `Finance` table. All the data in the column will be lost.
  - Added the required column `credentialsEmail` to the `Finance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_credentialsId_fkey";

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "credentialsId",
ADD COLUMN     "credentialsEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_credentialsEmail_fkey" FOREIGN KEY ("credentialsEmail") REFERENCES "Credentials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
