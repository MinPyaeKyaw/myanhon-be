/*
  Warnings:

  - You are about to drop the column `name` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `levelId` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ExamSection` table. All the data in the column will be lost.
  - You are about to drop the `ExamResult` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeId` to the `Exam` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `ExamSection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_levelId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExamSection" DROP CONSTRAINT "ExamSection_levelId_fkey";

-- AlterTable
ALTER TABLE "Exam" DROP COLUMN "name",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "typeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExamSection" DROP COLUMN "levelId",
DROP COLUMN "name",
ADD COLUMN     "sectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExamResult";

-- CreateTable
CREATE TABLE "ExamType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSection" ADD CONSTRAINT "ExamSection_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
