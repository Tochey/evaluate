/*
  Warnings:

  - You are about to drop the column `section` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[coursename]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `coursename` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Course_title_key` ON `Course`;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `section`,
    DROP COLUMN `title`,
    ADD COLUMN `coursename` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `courseId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `faculty` ADD COLUMN `courseId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Course_coursename_key` ON `Course`(`coursename`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `faculty` ADD CONSTRAINT `faculty_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`courseId`) ON DELETE SET NULL ON UPDATE CASCADE;
