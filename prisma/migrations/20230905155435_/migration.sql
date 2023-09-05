-- CreateTable
CREATE TABLE "Tests" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestAnswers" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "testId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestAnswers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tests" ADD CONSTRAINT "Tests_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Contents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAnswers" ADD CONSTRAINT "TestAnswers_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
