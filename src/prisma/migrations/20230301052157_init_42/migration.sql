/*
  Warnings:

  - You are about to drop the column `sumbittedAt` on the `Submission` table. All the data in the column will be lost.
  - Added the required column `submittedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Submission` DROP COLUMN `sumbittedAt`,
    ADD COLUMN `submittedAt` VARCHAR(191) NOT NULL;
