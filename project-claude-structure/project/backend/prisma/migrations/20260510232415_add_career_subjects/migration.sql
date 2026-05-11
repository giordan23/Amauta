-- AlterTable
ALTER TABLE "users" ADD COLUMN     "targetCareerId" TEXT;

-- CreateTable
CREATE TABLE "career_subjects" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "careerId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,

    CONSTRAINT "career_subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "career_subjects_careerId_subjectId_key" ON "career_subjects"("careerId", "subjectId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_targetCareerId_fkey" FOREIGN KEY ("targetCareerId") REFERENCES "careers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_subjects" ADD CONSTRAINT "career_subjects_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "career_subjects" ADD CONSTRAINT "career_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
