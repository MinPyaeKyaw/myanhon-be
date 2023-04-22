/*
  Warnings:

  - The values [listenting] on the enum `CourseTypes` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CourseTypes_new" AS ENUM ('grammer', 'listening', 'reading', 'kanji', 'vocaburary', 'speaking', 'vlog');
ALTER TABLE "Types" ALTER COLUMN "name" DROP DEFAULT;
ALTER TABLE "Types" ALTER COLUMN "name" TYPE "CourseTypes_new" USING ("name"::text::"CourseTypes_new");
ALTER TYPE "CourseTypes" RENAME TO "CourseTypes_old";
ALTER TYPE "CourseTypes_new" RENAME TO "CourseTypes";
DROP TYPE "CourseTypes_old";
ALTER TABLE "Types" ALTER COLUMN "name" SET DEFAULT 'grammer';
COMMIT;
