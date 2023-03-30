-- CreateEnum
CREATE TYPE "CourseTypes" AS ENUM ('grammer', 'listenting', 'reading', 'kanji', 'vocaburary', 'speaking', 'vlog');

-- CreateEnum
CREATE TYPE "LevelNames" AS ENUM ('N5', 'N4', 'N3', 'N2', 'N1');

-- CreateTable
CREATE TABLE "Levels" (
    "id" TEXT NOT NULL,
    "name" "LevelNames" NOT NULL DEFAULT 'N5',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Levels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Types" (
    "id" TEXT NOT NULL,
    "name" "CourseTypes" NOT NULL DEFAULT 'grammer',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "expiredDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courses" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_type_fkey" FOREIGN KEY ("type") REFERENCES "Types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courses" ADD CONSTRAINT "Courses_level_fkey" FOREIGN KEY ("level") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
