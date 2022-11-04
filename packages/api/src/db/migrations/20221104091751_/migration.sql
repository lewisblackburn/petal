/*
  Warnings:

  - You are about to drop the `RatingOnMovie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RatingOnMovie" DROP CONSTRAINT "RatingOnMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "RatingOnMovie" DROP CONSTRAINT "RatingOnMovie_ratingId_fkey";

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "avg_rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "movieId" UUID;

-- DropTable
DROP TABLE "RatingOnMovie";

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
