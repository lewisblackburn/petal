/*
  Warnings:

  - You are about to drop the column `productionCompanyId` on the `FilmProductionInformation` table. All the data in the column will be lost.
  - You are about to drop the column `freebaseId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `freebaseMid` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `imdbId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `tmdbId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `tvrageId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `wikiDataId` on the `Film` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_FilmProductionInformationToProductionCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmProductionInformationToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "FilmProductionInformation" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmProductionInformationToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToFilmProductionInformation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToFilmProductionInformation_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToFilmProductionInformation_B_fkey" FOREIGN KEY ("B") REFERENCES "FilmProductionInformation" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmProductionInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmProductionInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmProductionInformation" ("createdAt", "filmId", "id", "updatedAt") SELECT "createdAt", "filmId", "id", "updatedAt" FROM "FilmProductionInformation";
DROP TABLE "FilmProductionInformation";
ALTER TABLE "new_FilmProductionInformation" RENAME TO "FilmProductionInformation";
CREATE UNIQUE INDEX "FilmProductionInformation_id_key" ON "FilmProductionInformation"("id");
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
    "imdbID" TEXT,
    "wikiDataID" TEXT,
    "tmdbID" TEXT,
    "freebaseID" TEXT,
    "freebaseMID" TEXT,
    "tvrageID" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "tagline" TEXT DEFAULT '',
    CONSTRAINT "Film_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "trailer", "twitter", "updatedAt", "userScore", "website") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "instagram", "languageId", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "trailer", "twitter", "updatedAt", "userScore", "website" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
CREATE TABLE "new_ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "countryCode" TEXT,
    "logo" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductionCompany_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductionCompany" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "ProductionCompany";
DROP TABLE "ProductionCompany";
ALTER TABLE "new_ProductionCompany" RENAME TO "ProductionCompany";
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");
CREATE UNIQUE INDEX "ProductionCompany_name_key" ON "ProductionCompany"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_FilmProductionInformationToProductionCompany_AB_unique" ON "_FilmProductionInformationToProductionCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmProductionInformationToProductionCompany_B_index" ON "_FilmProductionInformationToProductionCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToFilmProductionInformation_AB_unique" ON "_CountryToFilmProductionInformation"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToFilmProductionInformation_B_index" ON "_CountryToFilmProductionInformation"("B");
