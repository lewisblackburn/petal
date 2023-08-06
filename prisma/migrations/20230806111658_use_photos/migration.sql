/*
  Warnings:

  - You are about to drop the column `backdrop` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `Film` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "tagline" TEXT,
    "releaseDate" DATETIME,
    "runtime" REAL,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "tmdbId" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Film" ("budget", "createdAt", "id", "instagram", "locked", "overview", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "twitter", "updatedAt", "website") SELECT "budget", "createdAt", "id", "instagram", "locked", "overview", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "twitter", "updatedAt", "website" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
