/*
  Warnings:

  - The primary key for the `Rating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `movieId` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_movieId_fkey";

-- AlterTable
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_pkey",
DROP COLUMN "id",
ADD COLUMN     "userId" UUID NOT NULL,
ALTER COLUMN "value" DROP DEFAULT,
ALTER COLUMN "movieId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_movieId_key" ON "Rating"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
