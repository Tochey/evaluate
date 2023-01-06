/*
  Warnings:

  - You are about to drop the column `userId` on the `Submission` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sid` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Submission` DROP FOREIGN KEY `Submission_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_courseId_fkey`;

-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `userId`,
    ADD COLUMN `sid` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `Student` (
    `sid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `role` ENUM('BASIC', 'FACULTY', 'SUPERUSER') NOT NULL DEFAULT 'BASIC',
    `password` VARCHAR(191) NOT NULL,
    `isEnabled` BOOLEAN NOT NULL DEFAULT false,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `courseId` VARCHAR(191) NULL,

    UNIQUE INDEX `Student_email_key`(`email`),
    UNIQUE INDEX `Student_username_key`(`username`),
    PRIMARY KEY (`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Submission` ADD CONSTRAINT `Submission_sid_fkey` FOREIGN KEY (`sid`) REFERENCES `Student`(`sid`) ON DELETE RESTRICT ON UPDATE CASCADE;
