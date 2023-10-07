/*
  Warnings:

  - You are about to drop the column `levelId` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the column `typeId` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the `ExamMeta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ExamSectionMeta` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `duration` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionCount` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requiredMinScore` to the `ExamSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalScore` to the `ExamSection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamMeta" DROP CONSTRAINT "ExamMeta_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ExamMeta" DROP CONSTRAINT "ExamMeta_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_typeId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSectionMeta" DROP CONSTRAINT "ExamSectionMeta_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSectionMeta" DROP CONSTRAINT "ExamSectionMeta_typeId_fkey";

-- DropForeignKey
ALTER TABLE "UserExamSectionResult" DROP CONSTRAINT "UserExamSectionResult_sectionId_fkey";

-- AlterTable
ALTER TABLE "ExamSection" DROP COLUMN "levelId",
DROP COLUMN "typeId",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "examId" TEXT NOT NULL,
ADD COLUMN     "questionCount" INTEGER NOT NULL,
ADD COLUMN     "requiredMinScore" INTEGER NOT NULL,
ADD COLUMN     "totalScore" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ExamMeta";

-- DropTable
DROP TABLE "ExamSectionMeta";

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "requiredMinScore" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
