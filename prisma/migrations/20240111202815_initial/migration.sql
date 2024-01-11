/*
  Warnings:

  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Language` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `countryCode` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Film` table. All the data in the column will be lost.
  - Added the required column `code` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmReleaseInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "language" TEXT,
    "date" DATETIME NOT NULL,
    "classification" TEXT,
    "type" TEXT,
    "note" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReleaseInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmReleaseInformation" ("classification", "countryCode", "createdAt", "date", "filmId", "id", "language", "locked", "note", "type", "updatedAt") SELECT "classification", "countryCode", "createdAt", "date", "filmId", "id", "language", "locked", "note", "type", "updatedAt" FROM "FilmReleaseInformation";
DROP TABLE "FilmReleaseInformation";
ALTER TABLE "new_FilmReleaseInformation" RENAME TO "FilmReleaseInformation";
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");
CREATE TABLE "new_Language" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "nativeName" TEXT NOT NULL
);
INSERT INTO "new_Language" ("name", "nativeName") SELECT "name", "nativeName" FROM "Language";
DROP TABLE "Language";
ALTER TABLE "new_Language" RENAME TO "Language";
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");
CREATE TABLE "new__CountryToLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CountryToLanguage" ("A", "B") SELECT "A", "B" FROM "_CountryToLanguage";
DROP TABLE "_CountryToLanguage";
ALTER TABLE "new__CountryToLanguage" RENAME TO "_CountryToLanguage";
CREATE UNIQUE INDEX "_CountryToLanguage_AB_unique" ON "_CountryToLanguage"("A", "B");
CREATE INDEX "_CountryToLanguage_B_index" ON "_CountryToLanguage"("B");
CREATE TABLE "new_FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmAlternateTitle_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmAlternateTitle" ("countryCode", "createdAt", "filmId", "id", "locked", "title", "updatedAt") SELECT "countryCode", "createdAt", "filmId", "id", "locked", "title", "updatedAt" FROM "FilmAlternateTitle";
DROP TABLE "FilmAlternateTitle";
ALTER TABLE "new_FilmAlternateTitle" RENAME TO "FilmAlternateTitle";
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");
CREATE TABLE "new_Country" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Country" ("createdAt", "flag", "name", "updatedAt") SELECT "createdAt", "flag", "name", "updatedAt" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "languageName" TEXT,
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
    CONSTRAINT "Film_languageName_fkey" FOREIGN KEY ("languageName") REFERENCES "Language" ("name") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "freebaseId", "freebaseMid", "id", "imdbId", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "tvrageId", "twitter", "updatedAt", "userScore", "website", "wikiDataId" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
