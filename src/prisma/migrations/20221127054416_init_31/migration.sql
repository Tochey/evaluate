/*
  Warnings:

  - Added the required column `sourceCode` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` ADD COLUMN `sourceCode` VARCHAR(191) NOT NULL;
