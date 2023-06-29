-- CreateTable
CREATE TABLE "_CoursesToInstructors" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursesToInstructors_AB_unique" ON "_CoursesToInstructors"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursesToInstructors_B_index" ON "_CoursesToInstructors"("B");

-- AddForeignKey
ALTER TABLE "_CoursesToInstructors" ADD CONSTRAINT "_CoursesToInstructors_A_fkey" FOREIGN KEY ("A") REFERENCES "Courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursesToInstructors" ADD CONSTRAINT "_CoursesToInstructors_B_fkey" FOREIGN KEY ("B") REFERENCES "Instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
