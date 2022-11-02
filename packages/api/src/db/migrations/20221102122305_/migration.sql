/*
  Warnings:

  - You are about to drop the column `watchlistId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_watchlistId_fkey";

-- DropIndex
DROP INDEX "User_watchlistId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "watchlistId";

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
