/*
  Warnings:

  - You are about to drop the `Langauge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Langauge_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Langauge";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL
);

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
    "userScore" REAL NOT NULL DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "imdbId" TEXT,
    "wikiDataId" TEXT,
    "tmdbId" TEXT,
    "freebaseId" TEXT,
    "freebaseMid" TEXT,
    "tvrageId" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "tagline" TEXT DEFAULT '',
    CONSTRAINT "Film_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
CREATE TABLE "new__CountryToLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("countryCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CountryToLanguage" ("A", "B") SELECT "A", "B" FROM "_CountryToLanguage";
DROP TABLE "_CountryToLanguage";
ALTER TABLE "new__CountryToLanguage" RENAME TO "_CountryToLanguage";
CREATE UNIQUE INDEX "_CountryToLanguage_AB_unique" ON "_CountryToLanguage"("A", "B");
CREATE INDEX "_CountryToLanguage_B_index" ON "_CountryToLanguage"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Language_id_key" ON "Language"("id");
