/*
  Warnings:

  - You are about to drop the column `sectionMetaId` on the `UserExamSectionResult` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserExamSectionResult" DROP CONSTRAINT "UserExamSectionResult_sectionMetaId_fkey";

-- AlterTable
ALTER TABLE "UserExamSectionResult" DROP COLUMN "sectionMetaId";
