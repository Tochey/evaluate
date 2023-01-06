/*
  Warnings:

  - You are about to drop the column `testCases` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `language` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `testCases` to the `CodingActivity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Activity` DROP COLUMN `testCases`;

-- AlterTable
ALTER TABLE `CodingActivity` ADD COLUMN `language` ENUM('JAVA', 'PYTHON') NOT NULL,
    ADD COLUMN `testCases` JSON NOT NULL;
