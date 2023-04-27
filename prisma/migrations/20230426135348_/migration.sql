/*
  Warnings:

  - You are about to drop the column `isPaid` on the `Courses` table. All the data in the column will be lost.
  - Added the required column `thumbnail` to the `Contents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contents" ADD COLUMN     "thumbnail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Courses" DROP COLUMN "isPaid";
