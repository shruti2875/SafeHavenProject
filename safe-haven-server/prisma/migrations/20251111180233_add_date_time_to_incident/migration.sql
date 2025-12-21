/*
  Warnings:

  - You are about to drop the column `type` on the `incident` table. All the data in the column will be lost.
  - Added the required column `title` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `incident` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `incident` DROP COLUMN `type`,
    ADD COLUMN `date` DATETIME(3) NULL,
    ADD COLUMN `time` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
