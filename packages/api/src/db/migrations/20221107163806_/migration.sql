/*
  Warnings:

  - You are about to drop the column `backdrop` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "backdrop",
DROP COLUMN "poster",
ADD COLUMN     "backdrops" TEXT[],
ADD COLUMN     "posters" TEXT[],
ADD COLUMN     "videos" TEXT[];
