/*
  Warnings:

  - You are about to drop the column `examId` on the `ExamQuestion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_examId_fkey";

-- AlterTable
ALTER TABLE "ExamQuestion" DROP COLUMN "examId";
