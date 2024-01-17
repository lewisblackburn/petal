/*
  Warnings:

  - The primary key for the `FilmRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `FilmRecommendation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "similarity" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRecommendation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmRecommendation" ("createdAt", "filmId", "similarity", "updatedAt") SELECT "createdAt", "filmId", "similarity", "updatedAt" FROM "FilmRecommendation";
DROP TABLE "FilmRecommendation";
ALTER TABLE "new_FilmRecommendation" RENAME TO "FilmRecommendation";
CREATE UNIQUE INDEX "FilmRecommendation_id_key" ON "FilmRecommendation"("id");
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "languageId" TEXT,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "voteAverage" REAL NOT NULL DEFAULT 0,
    "voteCount" INTEGER DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "imdbID" TEXT,
    "wikiDataID" TEXT,
    "tmdbID" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "tagline" TEXT,
    CONSTRAINT "Film_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
