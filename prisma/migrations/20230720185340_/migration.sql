-- CreateTable
CREATE TABLE "QuestioniarsQuizz" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestioniarsQuizz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestioniarAnswer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestioniarAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestioniarAnswer" ADD CONSTRAINT "QuestioniarAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "QuestioniarsQuizz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
