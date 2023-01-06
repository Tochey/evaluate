/*
  Warnings:

  - Added the required column `skeleton` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CodingActivity` ADD COLUMN `skeleton` VARCHAR(191) NOT NULL,
    MODIFY `testCases` VARCHAR(191) NOT NULL;
