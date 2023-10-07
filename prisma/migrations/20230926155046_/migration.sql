-- CreateTable
CREATE TABLE "QuestionCountPerSection" (
    "id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionCountPerSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionCountPerSection" ADD CONSTRAINT "QuestionCountPerSection_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionCountPerSection" ADD CONSTRAINT "QuestionCountPerSection_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
