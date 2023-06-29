/*
  Warnings:

  - You are about to drop the `CourseInstructor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseInstructor" DROP CONSTRAINT "CourseInstructor_courseId_fkey";

-- DropForeignKey
ALTER TABLE "CourseInstructor" DROP CONSTRAINT "CourseInstructor_instructorId_fkey";

-- DropTable
DROP TABLE "CourseInstructor";
