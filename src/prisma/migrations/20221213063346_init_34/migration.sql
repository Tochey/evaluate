-- DropForeignKey
ALTER TABLE `LearningObjective` DROP FOREIGN KEY `LearningObjective_activityId_fkey`;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;
