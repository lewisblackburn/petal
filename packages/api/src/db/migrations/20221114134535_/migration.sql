/*
  Warnings:

  - The `age_rating` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Movie` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `Log` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "MediaType" ADD VALUE 'SHOW';
ALTER TYPE "MediaType" ADD VALUE 'BOOK';
ALTER TYPE "MediaType" ADD VALUE 'SONG';

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_personId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_userId_fkey";

-- AlterTable
ALTER TABLE "Keyword" ADD COLUMN     "showId" UUID;

-- AlterTable
ALTER TABLE "Log" DROP COLUMN "type",
ADD COLUMN     "type" "MediaType" NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "age_rating",
ADD COLUMN     "age_rating" "AgeRating",
DROP COLUMN "status",
ADD COLUMN     "status" "Status" DEFAULT 'PLANNED';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Character";

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "ShowRating" (
    "value" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "showId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MovieRating" (
    "value" INTEGER NOT NULL,
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MovieCharacter" (
    "personId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CrewMemberRole" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" TEXT NOT NULL,

    CONSTRAINT "CrewMemberRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MovieCrewMember" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "personId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieCrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCrewMember" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "personId" UUID NOT NULL,
    "showId" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ShowCrewMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCharacter" (
    "personId" UUID NOT NULL,
    "showId" UUID NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MovieReview" (
    "userId" UUID NOT NULL,
    "movieId" UUID NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ShowReview" (
    "userId" UUID NOT NULL,
    "showId" UUID NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Show" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "tagline" TEXT,
    "popularity" DOUBLE PRECISION DEFAULT 0,
    "age_rating" "AgeRating",
    "runtime" INTEGER DEFAULT 0,
    "homepage" TEXT,
    "language" TEXT,
    "videos" TEXT[],
    "posters" TEXT[],
    "backdrops" TEXT[],
    "contentScore" INTEGER DEFAULT 0,
    "locked" TEXT[],
    "adult" BOOLEAN DEFAULT false,
    "status" "Status" DEFAULT 'PLANNED',
    "releaseDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CrewMemberRoleToMovieCrewMember" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_CrewMemberRoleToShowCrewMember" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GenreToShow" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ShowToWatchlist" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_ListToShow" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ShowRating_userId_showId_key" ON "ShowRating"("userId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieRating_userId_movieId_key" ON "MovieRating"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieCharacter_personId_movieId_key" ON "MovieCharacter"("personId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieCrewMember_personId_movieId_key" ON "MovieCrewMember"("personId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowCrewMember_personId_showId_key" ON "ShowCrewMember"("personId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowCharacter_personId_showId_key" ON "ShowCharacter"("personId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "MovieReview_userId_movieId_key" ON "MovieReview"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "ShowReview_userId_showId_key" ON "ShowReview"("userId", "showId");

-- CreateIndex
CREATE UNIQUE INDEX "_CrewMemberRoleToMovieCrewMember_AB_unique" ON "_CrewMemberRoleToMovieCrewMember"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewMemberRoleToMovieCrewMember_B_index" ON "_CrewMemberRoleToMovieCrewMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CrewMemberRoleToShowCrewMember_AB_unique" ON "_CrewMemberRoleToShowCrewMember"("A", "B");

-- CreateIndex
CREATE INDEX "_CrewMemberRoleToShowCrewMember_B_index" ON "_CrewMemberRoleToShowCrewMember"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToShow_AB_unique" ON "_GenreToShow"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToShow_B_index" ON "_GenreToShow"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ShowToWatchlist_AB_unique" ON "_ShowToWatchlist"("A", "B");

-- CreateIndex
CREATE INDEX "_ShowToWatchlist_B_index" ON "_ShowToWatchlist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ListToShow_AB_unique" ON "_ListToShow"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToShow_B_index" ON "_ListToShow"("B");

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowRating" ADD CONSTRAINT "ShowRating_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieRating" ADD CONSTRAINT "MovieRating_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCharacter" ADD CONSTRAINT "MovieCharacter_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCharacter" ADD CONSTRAINT "MovieCharacter_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrewMember" ADD CONSTRAINT "MovieCrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCrewMember" ADD CONSTRAINT "MovieCrewMember_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCrewMember" ADD CONSTRAINT "ShowCrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCrewMember" ADD CONSTRAINT "ShowCrewMember_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCharacter" ADD CONSTRAINT "ShowCharacter_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowCharacter" ADD CONSTRAINT "ShowCharacter_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieReview" ADD CONSTRAINT "MovieReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieReview" ADD CONSTRAINT "MovieReview_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowReview" ADD CONSTRAINT "ShowReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowReview" ADD CONSTRAINT "ShowReview_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_showId_fkey" FOREIGN KEY ("showId") REFERENCES "Show"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Show" ADD CONSTRAINT "Show_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewMemberRoleToMovieCrewMember" ADD CONSTRAINT "_CrewMemberRoleToMovieCrewMember_A_fkey" FOREIGN KEY ("A") REFERENCES "CrewMemberRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewMemberRoleToMovieCrewMember" ADD CONSTRAINT "_CrewMemberRoleToMovieCrewMember_B_fkey" FOREIGN KEY ("B") REFERENCES "MovieCrewMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewMemberRoleToShowCrewMember" ADD CONSTRAINT "_CrewMemberRoleToShowCrewMember_A_fkey" FOREIGN KEY ("A") REFERENCES "CrewMemberRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CrewMemberRoleToShowCrewMember" ADD CONSTRAINT "_CrewMemberRoleToShowCrewMember_B_fkey" FOREIGN KEY ("B") REFERENCES "ShowCrewMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToShow" ADD CONSTRAINT "_GenreToShow_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToShow" ADD CONSTRAINT "_GenreToShow_B_fkey" FOREIGN KEY ("B") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToWatchlist" ADD CONSTRAINT "_ShowToWatchlist_A_fkey" FOREIGN KEY ("A") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ShowToWatchlist" ADD CONSTRAINT "_ShowToWatchlist_B_fkey" FOREIGN KEY ("B") REFERENCES "Watchlist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToShow" ADD CONSTRAINT "_ListToShow_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToShow" ADD CONSTRAINT "_ListToShow_B_fkey" FOREIGN KEY ("B") REFERENCES "Show"("id") ON DELETE CASCADE ON UPDATE CASCADE;
