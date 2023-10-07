/*
  Warnings:

  - You are about to drop the `QuestionCountPerSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionCountPerSection" DROP CONSTRAINT "QuestionCountPerSection_levelId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionCountPerSection" DROP CONSTRAINT "QuestionCountPerSection_typeId_fkey";

-- DropTable
DROP TABLE "QuestionCountPerSection";

-- CreateTable
CREATE TABLE "ExamSectionMeta" (
    "id" TEXT NOT NULL,
    "questionCount" INTEGER NOT NULL,
    "requiredMinScore" INTEGER NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamSectionMeta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExamResult" (
    "id" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "requiredMinScore" INTEGER NOT NULL,
    "userScore" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExamResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserExamSectionResult" (
    "id" TEXT NOT NULL,
    "userScore" INTEGER NOT NULL,
    "examId" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "sectionMetaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserExamSectionResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamSectionMeta" ADD CONSTRAINT "ExamSectionMeta_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamSectionMeta" ADD CONSTRAINT "ExamSectionMeta_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamResult" ADD CONSTRAINT "UserExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamSectionResult" ADD CONSTRAINT "UserExamSectionResult_examId_fkey" FOREIGN KEY ("examId") REFERENCES "UserExamResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamSectionResult" ADD CONSTRAINT "UserExamSectionResult_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ExamSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserExamSectionResult" ADD CONSTRAINT "UserExamSectionResult_sectionMetaId_fkey" FOREIGN KEY ("sectionMetaId") REFERENCES "ExamSectionMeta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
