-- DropForeignKey
ALTER TABLE `LearningObjective` DROP FOREIGN KEY `LearningObjective_courseId_fkey`;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
