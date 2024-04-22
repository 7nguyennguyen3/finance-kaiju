-- AlterTable
ALTER TABLE "GOAL" ADD COLUMN     "credentialsEmail" TEXT,
ADD COLUMN     "userEmail" TEXT;

-- AddForeignKey
ALTER TABLE "GOAL" ADD CONSTRAINT "GOAL_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GOAL" ADD CONSTRAINT "GOAL_credentialsEmail_fkey" FOREIGN KEY ("credentialsEmail") REFERENCES "Credentials"("email") ON DELETE SET NULL ON UPDATE CASCADE;
