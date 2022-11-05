/*
  Warnings:

  - You are about to drop the column `avg_rating` on the `Movie` table. All the data in the column will be lost.
  - Changed the type of `value` on the `Edit` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Edit" DROP COLUMN "value",
ADD COLUMN     "value" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "avg_rating",
ADD COLUMN     "popularity" DOUBLE PRECISION DEFAULT 0;
