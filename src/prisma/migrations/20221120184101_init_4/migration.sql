/*
  Warnings:

  - You are about to drop the `facultyStore` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `facultyStore`;

-- CreateTable
CREATE TABLE `faculty` (
    `fid` VARCHAR(191) NOT NULL,
    `facultyId` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `faculty_facultyId_key`(`facultyId`),
    PRIMARY KEY (`fid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
