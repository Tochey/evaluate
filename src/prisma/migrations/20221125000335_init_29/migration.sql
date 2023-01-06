/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Course_accessCode_key` ON `Course`(`accessCode`);
