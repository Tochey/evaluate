/*
  Warnings:

  - You are about to drop the column `facultyname` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `LearningObjective` DROP FOREIGN KEY `LearningObjective_activityId_fkey`;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `facultyname`;

-- AlterTable
ALTER TABLE `LearningObjective` MODIFY `activityId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE SET NULL ON UPDATE CASCADE;
