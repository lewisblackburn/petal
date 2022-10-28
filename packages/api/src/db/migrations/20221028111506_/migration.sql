/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('RUMORED', 'PLANNED', 'IN_PRODUCTION', 'POST_PRODUCTION', 'RELEASED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('ACTION', 'ADVENTURE', 'ANIMATION', 'COMEDY', 'CRIME', 'MYSTERY', 'FANTASY', 'HISTORICAL', 'HORROR', 'ROMANCE', 'SATIRE', 'SCIENCE_FICTION', 'CYBERPUNK', 'SPECULATIVE', 'THRILLER', 'WESTERN');

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropTable
DROP TABLE "Post";

-- DropEnum
DROP TYPE "PostStatus";

-- CreateTable
CREATE TABLE "Movie" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "tagline" TEXT,
    "genres" "Genre"[],
    "runtime" INTEGER DEFAULT 0,
    "homepage" TEXT,
    "language" TEXT,
    "backdrop" TEXT,
    "poster" TEXT,
    "adult" BOOLEAN DEFAULT false,
    "budget" INTEGER DEFAULT 0,
    "revenue" INTEGER DEFAULT 0,
    "status" "Status" DEFAULT 'PLANNED',
    "locked" BOOLEAN DEFAULT false,
    "releaseDate" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
