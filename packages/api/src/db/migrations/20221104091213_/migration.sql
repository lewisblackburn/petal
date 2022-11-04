/*
  Warnings:

  - You are about to drop the column `movieId` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `movieId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Rating` table. All the data in the column will be lost.
  - You are about to drop the `PlatformOnMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_movieId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformOnMovie" DROP CONSTRAINT "PlatformOnMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "PlatformOnMovie" DROP CONSTRAINT "PlatformOnMovie_platformId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- DropIndex
DROP INDEX "Rating_userId_movieId_key";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "keywords" TEXT[];

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "movieId",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "movieId",
DROP COLUMN "userId",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "value" SET DEFAULT 0,
ADD CONSTRAINT "Rating_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "PlatformOnMovie";

-- CreateTable
CREATE TABLE "RatingOnMovie" (
    "movieId" UUID NOT NULL,
    "ratingId" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_MovieToPlatform" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "RatingOnMovie_ratingId_movieId_key" ON "RatingOnMovie"("ratingId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "_MovieToPlatform_AB_unique" ON "_MovieToPlatform"("A", "B");

-- CreateIndex
CREATE INDEX "_MovieToPlatform_B_index" ON "_MovieToPlatform"("B");

-- AddForeignKey
ALTER TABLE "RatingOnMovie" ADD CONSTRAINT "RatingOnMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingOnMovie" ADD CONSTRAINT "RatingOnMovie_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPlatform" ADD CONSTRAINT "_MovieToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MovieToPlatform" ADD CONSTRAINT "_MovieToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;
