/*
  Warnings:

  - Added the required column `name` to the `ExamSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExamSection" ADD COLUMN     "name" TEXT NOT NULL;
