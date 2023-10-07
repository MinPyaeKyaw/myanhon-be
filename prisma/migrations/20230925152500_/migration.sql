/*
  Warnings:

  - You are about to drop the column `examId` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the column `sectionId` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `levelId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_sectionId_fkey";

-- AlterTable
ALTER TABLE "ExamSection" DROP COLUMN "examId",
DROP COLUMN "sectionId",
ADD COLUMN     "levelId" TEXT NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "Section";

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
