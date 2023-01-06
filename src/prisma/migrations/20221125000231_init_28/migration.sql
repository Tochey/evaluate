/*
  Warnings:

  - Made the column `accessCode` on table `Course` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `accessCode` VARCHAR(191) NOT NULL;
