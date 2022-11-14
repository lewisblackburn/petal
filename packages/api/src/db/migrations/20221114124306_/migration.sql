/*
  Warnings:

  - You are about to drop the column `keywords` on the `Movie` table. All the data in the column will be lost.
  - The `age_rating` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `type` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Log" DROP COLUMN "type",
ADD COLUMN     "type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "keywords",
DROP COLUMN "age_rating",
ADD COLUMN     "age_rating" "AgeRating",
ALTER COLUMN "contentScore" SET DEFAULT 0,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "Keyword" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_KeywordToMovie" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KeywordToMovie_AB_unique" ON "_KeywordToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_KeywordToMovie_B_index" ON "_KeywordToMovie"("B");

-- AddForeignKey
ALTER TABLE "_KeywordToMovie" ADD CONSTRAINT "_KeywordToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KeywordToMovie" ADD CONSTRAINT "_KeywordToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
