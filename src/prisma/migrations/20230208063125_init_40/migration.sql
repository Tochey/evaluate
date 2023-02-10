-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `isLate` BOOLEAN NULL DEFAULT false,
    MODIFY `score` LONGTEXT NOT NULL,
    MODIFY `sourceCode` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `CodingActivityMetric` (
    `activityMetricId` VARCHAR(191) NOT NULL,
    `timeSpent` INTEGER NOT NULL,
    `runCount` INTEGER NOT NULL,
    `submissionId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `CodingActivityMetric_submissionId_key`(`submissionId`),
    PRIMARY KEY (`activityMetricId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StudentMetric` (
    `studentMetricId` VARCHAR(191) NOT NULL,
    `lastLogin` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`studentMetricId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CodingActivityMetric` ADD CONSTRAINT `CodingActivityMetric_submissionId_fkey` FOREIGN KEY (`submissionId`) REFERENCES `Submission`(`submissionId`) ON DELETE RESTRICT ON UPDATE CASCADE;
