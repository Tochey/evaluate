-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('BASIC', 'FACULTY', 'SUPERUSER') NOT NULL DEFAULT 'BASIC';

-- CreateTable
CREATE TABLE `facultyStore` (
    `fid` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `facultyStore_facultyId_key`(`facultyId`),
    PRIMARY KEY (`fid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
