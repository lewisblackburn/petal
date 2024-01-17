/*
  Warnings:

  - You are about to drop the column `userScore` on the `Film` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "tagline" TEXT DEFAULT '',
    CONSTRAINT "Film_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "website", "wikiDataID") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "website", "wikiDataID" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
