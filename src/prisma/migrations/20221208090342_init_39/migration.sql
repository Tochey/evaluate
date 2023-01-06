/*
  Warnings:

  - You are about to alter the column `score` on the `Submission` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE `Submission` MODIFY `score` DECIMAL(65, 30) NOT NULL;
