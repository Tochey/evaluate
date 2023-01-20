/*
  Warnings:

  - Added the required column `fullName` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Course` DROP FOREIGN KEY `Course_instructorId_fkey`;

-- AlterTable
ALTER TABLE `Student` ADD COLUMN `fullName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `faculty`(`fid`) ON DELETE CASCADE ON UPDATE CASCADE;
