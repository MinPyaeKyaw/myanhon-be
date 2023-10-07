-- CreateTable
CREATE TABLE "ExamMeta" (
    "id" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "requiredMinScore" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "typeId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExamMeta_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExamMeta" ADD CONSTRAINT "ExamMeta_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "ExamType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamMeta" ADD CONSTRAINT "ExamMeta_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
