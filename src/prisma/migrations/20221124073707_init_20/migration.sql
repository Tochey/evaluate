/*
  Warnings:

  - A unique constraint covering the columns `[topic]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[question]` on the table `CodingActivity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `testCases` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Activity` ADD COLUMN `testCases` JSON NOT NULL,
    MODIFY `availablefrom` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `score` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Activity_topic_key` ON `Activity`(`topic`);

-- CreateIndex
CREATE INDEX `Activity_activityId_idx` ON `Activity`(`activityId`);

-- CreateIndex
CREATE UNIQUE INDEX `CodingActivity_question_key` ON `CodingActivity`(`question`);

-- CreateIndex
CREATE INDEX `Course_courseId_idx` ON `Course`(`courseId`);

-- CreateIndex
CREATE INDEX `LearningObjective_learningObjId_idx` ON `LearningObjective`(`learningObjId`);

-- CreateIndex
CREATE INDEX `Student_sid_idx` ON `Student`(`sid`);

-- CreateIndex
CREATE INDEX `Submission_submissionId_idx` ON `Submission`(`submissionId`);

-- CreateIndex
CREATE INDEX `faculty_fid_idx` ON `faculty`(`fid`);
