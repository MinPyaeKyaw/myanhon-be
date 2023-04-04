/*
  Warnings:

  - Added the required column `isEmailVerified` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "isEmailVerified" BOOLEAN NOT NULL;
