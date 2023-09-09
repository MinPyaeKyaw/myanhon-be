/*
  Warnings:

  - You are about to drop the `UserTracking` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserTracking" DROP CONSTRAINT "UserTracking_contentId_fkey";

-- DropForeignKey
ALTER TABLE "UserTracking" DROP CONSTRAINT "UserTracking_userId_fkey";

-- DropTable
DROP TABLE "UserTracking";

-- CreateTable
CREATE TABLE "ContentTracking" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completedPercent" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestTracking" (
    "id" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestTracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContentTracking" ADD CONSTRAINT "ContentTracking_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContentTracking" ADD CONSTRAINT "ContentTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestTracking" ADD CONSTRAINT "TestTracking_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestTracking" ADD CONSTRAINT "TestTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
