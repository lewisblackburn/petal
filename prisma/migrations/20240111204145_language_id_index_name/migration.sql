/*
  Warnings:

  - You are about to drop the column `languageName` on the `Film` table. All the data in the column will be lost.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `Language` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__CountryToLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CountryToLanguage" ("A", "B") SELECT "A", "B" FROM "_CountryToLanguage";
DROP TABLE "_CountryToLanguage";
ALTER TABLE "new__CountryToLanguage" RENAME TO "_CountryToLanguage";
CREATE UNIQUE INDEX "_CountryToLanguage_AB_unique" ON "_CountryToLanguage"("A", "B");
CREATE INDEX "_CountryToLanguage_B_index" ON "_CountryToLanguage"("B");
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
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
CREATE TABLE "new_Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL
);
INSERT INTO "new_Language" ("name", "nativeName") SELECT "name", "nativeName" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE UNIQUE INDEX "Language_id_key" ON "Language"("id");
CREATE INDEX "Language_name_idx" ON "Language"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
