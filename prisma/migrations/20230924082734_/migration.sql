/*
  Warnings:

  - Added the required column `levelId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exam" ADD COLUMN     "levelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
