/*
  Warnings:

  - You are about to drop the column `examId` on the `UserExamSectionResult` table. All the data in the column will be lost.
  - Added the required column `levelId` to the `UserExamResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `UserExamResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examResultId` to the `UserExamSectionResult` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('Failed', 'Passed');

-- DropForeignKey
ALTER TABLE "UserExamSectionResult" DROP CONSTRAINT "UserExamSectionResult_examId_fkey";

-- AlterTable
ALTER TABLE "UserExamResult" ADD COLUMN     "levelId" TEXT NOT NULL,
ADD COLUMN     "status" "ExamStatus" NOT NULL DEFAULT 'Failed',
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserExamSectionResult" DROP COLUMN "examId",
ADD COLUMN     "examResultId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "UserExamResult" ADD CONSTRAINT "UserExamResult_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamResult" ADD CONSTRAINT "UserExamResult_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamSectionResult" ADD CONSTRAINT "UserExamSectionResult_examResultId_fkey" FOREIGN KEY ("examResultId") REFERENCES "UserExamResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamSectionResult" ADD CONSTRAINT "UserExamSectionResult_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ExamSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
