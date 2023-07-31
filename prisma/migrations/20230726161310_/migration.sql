/*
  Warnings:

  - You are about to drop the column `levelId` on the `ExamQuestion` table. All the data in the column will be lost.
  - Added the required column `examId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_levelId_fkey";

-- AlterTable
ALTER TABLE "ExamQuestion" DROP COLUMN "levelId",
ALTER COLUMN "examId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ExamSection" ADD COLUMN     "examId" TEXT NOT NULL,
ADD COLUMN     "levelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;
