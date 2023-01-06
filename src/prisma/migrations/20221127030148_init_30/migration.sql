/*
  Warnings:

  - You are about to drop the column `skeleton` on the `CodingActivity` table. All the data in the column will be lost.
  - Added the required column `skeletonCode` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CodingActivity` DROP COLUMN `skeleton`,
    ADD COLUMN `skeletonCode` VARCHAR(191) NOT NULL;
