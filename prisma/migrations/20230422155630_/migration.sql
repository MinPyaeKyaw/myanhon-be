/*
  Warnings:

  - You are about to drop the column `userCourseId` on the `UserTracking` table. All the data in the column will be lost.
  - You are about to drop the `UserCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserCourse" DROP CONSTRAINT "UserCourse_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserTracking" DROP CONSTRAINT "UserTracking_userCourseId_fkey";

-- AlterTable
ALTER TABLE "UserTracking" DROP COLUMN "userCourseId";

-- DropTable
DROP TABLE "UserCourse";

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
