/*
  Warnings:

  - You are about to drop the column `duedate` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `CodingActivity` table. All the data in the column will be lost.
  - You are about to drop the column `activityId` on the `Submission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[activityId]` on the table `CodingActivity` will be added. If there are existing duplicate values, this will fail.
  - Made the column `courseId` on table `Activity` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `question` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codingActivityId` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_activityId_fkey`;

-- AlterTable
ALTER TABLE `Activity` DROP COLUMN `duedate`,
    DROP COLUMN `level`,
    DROP COLUMN `type`,
    MODIFY `courseId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `CodingActivity` DROP COLUMN `description`,
    ADD COLUMN `question` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `activityId`,
    ADD COLUMN `codingActivityId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CodingActivity_activityId_key` ON `CodingActivity`(`activityId`);

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_codingActivityId_fkey` FOREIGN KEY (`codingActivityId`) REFERENCES `CodingActivity`(`codingactivityId`) ON DELETE RESTRICT ON UPDATE CASCADE;
