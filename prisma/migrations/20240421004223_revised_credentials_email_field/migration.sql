/*
  Warnings:

  - You are about to drop the column `userEmail` on the `Finance` table. All the data in the column will be lost.
  - Made the column `credentialsEmail` on table `Finance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_credentialsEmail_fkey";

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "Finance_userEmail_fkey";

-- AlterTable
ALTER TABLE "Finance" DROP COLUMN "userEmail",
ALTER COLUMN "credentialsEmail" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "FinanceToUser_FK" FOREIGN KEY ("credentialsEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "FinanceToCredentials_FK" FOREIGN KEY ("credentialsEmail") REFERENCES "Credentials"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
