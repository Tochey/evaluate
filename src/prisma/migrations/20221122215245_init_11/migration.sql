-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CodingActivity` DROP FOREIGN KEY `CodingActivity_activityId_fkey`;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;
