/*
  Warnings:

  - Added the required column `runTimeStamp` to the `CodingActivityMetric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submitTimeStamp` to the `CodingActivityMetric` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CodingActivityMetric` ADD COLUMN `runTimeStamp` VARCHAR(191) NOT NULL,
    ADD COLUMN `submitTimeStamp` VARCHAR(191) NOT NULL;
