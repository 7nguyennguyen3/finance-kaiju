-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "FinanceToCredentials_FK";

-- DropForeignKey
ALTER TABLE "Finance" DROP CONSTRAINT "FinanceToUser_FK";

-- AlterTable
ALTER TABLE "Finance" ADD COLUMN     "userEmail" TEXT,
ALTER COLUMN "credentialsEmail" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finance" ADD CONSTRAINT "Finance_credentialsEmail_fkey" FOREIGN KEY ("credentialsEmail") REFERENCES "Credentials"("email") ON DELETE SET NULL ON UPDATE CASCADE;
