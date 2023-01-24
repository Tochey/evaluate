/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `LearningObjective` will be added. If there are existing duplicate values, this will fail.
  - Made the column `courseId` on table `LearningObjective` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `LearningObjective` DROP FOREIGN KEY `LearningObjective_courseId_fkey`;

-- AlterTable
ALTER TABLE `LearningObjective` MODIFY `courseId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `LearningObjective_courseId_key` ON `LearningObjective`(`courseId`);

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
