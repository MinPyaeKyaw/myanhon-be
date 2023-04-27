/*
  Warnings:

  - Added the required column `completedPercent` to the `UserTracking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserTracking" ADD COLUMN     "completedPercent" INTEGER NOT NULL;
