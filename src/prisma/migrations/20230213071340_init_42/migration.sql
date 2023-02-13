/*
  Warnings:

  - You are about to drop the column `skeletonCode` on the `CodingActivity` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CodingActivity` DROP COLUMN `skeletonCode`,
    MODIFY `testCases` LONGTEXT NOT NULL;
