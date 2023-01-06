/*
  Warnings:

  - You are about to drop the column `courseId` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `sid` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `faculty` table. All the data in the column will be lost.
  - You are about to drop the `_ActivityToLearningObjective` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `activityId` on table `CodingActivity` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `instructorId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `activityId` to the `LearningObjective` table without a default value. This is not possible if the table is not empty.
  - Made the column `courseId` on table `LearningObjective` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `studentid` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CodingActivity` DROP FOREIGN KEY `CodingActivity_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `LearningObjective` DROP FOREIGN KEY `LearningObjective_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_sid_fkey`;

-- DropForeignKey
ALTER TABLE `_ActivityToLearningObjective` DROP FOREIGN KEY `_ActivityToLearningObjective_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ActivityToLearningObjective` DROP FOREIGN KEY `_ActivityToLearningObjective_B_fkey`;

-- DropForeignKey
ALTER TABLE `faculty` DROP FOREIGN KEY `faculty_courseId_fkey`;

-- AlterTable
ALTER TABLE `CodingActivity` MODIFY `activityId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Course` ADD COLUMN `instructorId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `LearningObjective` ADD COLUMN `activityId` VARCHAR(191) NOT NULL,
    MODIFY `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Student` DROP COLUMN `courseId`;

-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `sid`,
    ADD COLUMN `studentid` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `faculty` DROP COLUMN `courseId`,
    ADD COLUMN `isAdmin` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_ActivityToLearningObjective`;

-- CreateTable
CREATE TABLE `_CourseToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CourseToStudent_AB_unique`(`A`, `B`),
    INDEX `_CourseToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `faculty`(`fid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CourseToStudent` ADD CONSTRAINT `_CourseToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;
