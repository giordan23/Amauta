-- =====================================================
-- SCHEMA Amauta - Apply in Supabase SQL Editor
-- =====================================================

-- MIGRATION 1: init
CREATE TYPE "DifficultyLevel" AS ENUM ('EASY', 'MEDIUM', 'HARD');
CREATE TYPE "ExamAttemptStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "country" TEXT,
    "targetUniversityId" TEXT,
    "targetCareerId" TEXT,
    "hasCompletedOnboarding" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "universities" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'Peru',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "universities_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "subjects" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "careers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "careers_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "career_subjects" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "careerId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    CONSTRAINT "career_subjects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "imageUrl" TEXT,
    "difficulty" "DifficultyLevel" NOT NULL,
    "examYear" INTEGER,
    "examPeriod" TEXT,
    "explanation" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "universityId" TEXT NOT NULL,
    "subjectId" TEXT NOT NULL,
    "careerId" TEXT,
    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "question_options" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "orderIndex" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    CONSTRAINT "question_options_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "exam_attempts" (
    "id" TEXT NOT NULL,
    "status" "ExamAttemptStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "score" DOUBLE PRECISION,
    "totalQuestions" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "universityId" TEXT NOT NULL,
    "subjectIds" TEXT[],
    "careerIds" TEXT[],
    "difficulty" "DifficultyLevel",
    "examYears" INTEGER[],
    "userId" UUID NOT NULL,
    CONSTRAINT "exam_attempts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "student_answers" (
    "id" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "examAttemptId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "selectedOptionId" TEXT,
    CONSTRAINT "student_answers_pkey" PRIMARY KEY ("id")
);

-- INDEXES
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "universities_name_key" ON "universities"("name");
CREATE UNIQUE INDEX "universities_shortName_key" ON "universities"("shortName");
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");
CREATE UNIQUE INDEX "careers_name_key" ON "careers"("name");
CREATE UNIQUE INDEX "career_subjects_careerId_subjectId_key" ON "career_subjects"("careerId", "subjectId");
CREATE UNIQUE INDEX "question_options_questionId_orderIndex_key" ON "question_options"("questionId", "orderIndex");
CREATE UNIQUE INDEX "student_answers_examAttemptId_questionId_key" ON "student_answers"("examAttemptId", "questionId");

-- FOREIGN KEYS
ALTER TABLE "users" ADD CONSTRAINT "users_targetUniversityId_fkey" FOREIGN KEY ("targetUniversityId") REFERENCES "universities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "users" ADD CONSTRAINT "users_targetCareerId_fkey" FOREIGN KEY ("targetCareerId") REFERENCES "careers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "questions" ADD CONSTRAINT "questions_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "questions" ADD CONSTRAINT "questions_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "questions" ADD CONSTRAINT "questions_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "career_subjects" ADD CONSTRAINT "career_subjects_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "careers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "career_subjects" ADD CONSTRAINT "career_subjects_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "subjects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "universities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "exam_attempts" ADD CONSTRAINT "exam_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_examAttemptId_fkey" FOREIGN KEY ("examAttemptId") REFERENCES "exam_attempts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "student_answers" ADD CONSTRAINT "student_answers_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "question_options"("id") ON DELETE SET NULL ON UPDATE CASCADE;
