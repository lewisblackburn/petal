/*
  Warnings:

  - You are about to drop the column `previousValue` on the `Log` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "previousValue";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "contentScore" INTEGER;
