-- DropForeignKey
ALTER TABLE `Activity` DROP FOREIGN KEY `Activity_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CodingActivity` DROP FOREIGN KEY `CodingActivity_activityId_fkey`;

-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_studentid_fkey`;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_studentid_fkey` FOREIGN KEY (`studentid`) REFERENCES `Student`(`sid`) ON DELETE CASCADE ON UPDATE CASCADE;
