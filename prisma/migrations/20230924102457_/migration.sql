/*
  Warnings:

  - You are about to drop the column `sectionId` on the `ExamQuestion` table. All the data in the column will be lost.
  - Added the required column `examSectionId` to the `ExamQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_sectionId_fkey";

-- AlterTable
ALTER TABLE "ExamQuestion" DROP COLUMN "sectionId",
ADD COLUMN     "examSectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_examSectionId_fkey" FOREIGN KEY ("examSectionId") REFERENCES "ExamSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
