-- CreateTable
CREATE TABLE `User` (
    `userId` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('BASIC', 'FACULTY') NOT NULL DEFAULT 'BASIC',
    `password` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_password_key`(`password`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `courseId` VARCHAR(191) NOT NULL,
    `major` VARCHAR(191) NOT NULL DEFAULT 'Computer Science',
    `facultyname` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `academicyear` VARCHAR(191) NOT NULL,
    `academicterm` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Course_title_key`(`title`),
    PRIMARY KEY (`courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningObjective` (
    `learningObjId` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`learningObjId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `activityId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NULL,
    `type` ENUM('Coding', 'MultipleChoice', 'TrueFalse', 'FillInBlank', 'Matching') NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `numofattempts` INTEGER NOT NULL,
    `level` ENUM('EASY', 'MEDIUM', 'HARD') NOT NULL DEFAULT 'EASY',
    `duedate` DATETIME(3) NOT NULL,
    `availablefrom` DATETIME(3) NOT NULL,
    `availableto` DATETIME(3) NOT NULL,

    PRIMARY KEY (`activityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CodingActivity` (
    `codingactivityId` VARCHAR(191) NOT NULL,
    `activityId` VARCHAR(191) NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`codingactivityId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Submission` (
    `submissionId` VARCHAR(191) NOT NULL,
    `activityId` VARCHAR(191) NOT NULL,
    `sumbittedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`submissionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ActivityToLearningObjective` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ActivityToLearningObjective_AB_unique`(`A`, `B`),
    INDEX `_ActivityToLearningObjective_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LearningObjective` ADD CONSTRAINT `LearningObjective_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CodingActivity` ADD CONSTRAINT `CodingActivity_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`activityId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActivityToLearningObjective` ADD CONSTRAINT `_ActivityToLearningObjective_A_fkey` FOREIGN KEY (`A`) REFERENCES `Activity`(`activityId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActivityToLearningObjective` ADD CONSTRAINT `_ActivityToLearningObjective_B_fkey` FOREIGN KEY (`B`) REFERENCES `LearningObjective`(`learningObjId`) ON DELETE CASCADE ON UPDATE CASCADE;
