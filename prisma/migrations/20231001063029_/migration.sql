/*
  Warnings:

  - You are about to drop the column `examSectionId` on the `ExamQuestion` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `ExamQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExamQuestion" DROP CONSTRAINT "ExamQuestion_examSectionId_fkey";

-- AlterTable
ALTER TABLE "ExamQuestion" DROP COLUMN "examSectionId",
ADD COLUMN     "sectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExamQuestion" ADD CONSTRAINT "ExamQuestion_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ExamSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
