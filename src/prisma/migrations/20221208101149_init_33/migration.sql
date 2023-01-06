-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_codingActivityId_fkey`;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_codingActivityId_fkey` FOREIGN KEY (`codingActivityId`) REFERENCES `CodingActivity`(`codingactivityId`) ON DELETE CASCADE ON UPDATE CASCADE;
