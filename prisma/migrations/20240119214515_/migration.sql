/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CountryToFilm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CountryToLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `countryCode` on the `FilmAlternateTitle` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `ProductionCompany` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Film` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `FilmReleaseInformation` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `FilmReleaseInformation` table. All the data in the column will be lost.
  - Added the required column `country` to the `FilmAlternateTitle` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Country_name_key";

-- DropIndex
DROP INDEX "Country_code_key";

-- DropIndex
DROP INDEX "Language_name_idx";

-- DropIndex
DROP INDEX "Language_id_key";

-- DropIndex
DROP INDEX "_CountryToFilm_B_index";

-- DropIndex
DROP INDEX "_CountryToFilm_AB_unique";

-- DropIndex
DROP INDEX "_CountryToLanguage_B_index";

-- DropIndex
DROP INDEX "_CountryToLanguage_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Country";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Language";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToFilm";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToLanguage";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmAlternateTitle" ("createdAt", "filmId", "id", "locked", "title", "updatedAt") SELECT "createdAt", "filmId", "id", "locked", "title", "updatedAt" FROM "FilmAlternateTitle";
DROP TABLE "FilmAlternateTitle";
ALTER TABLE "new_FilmAlternateTitle" RENAME TO "FilmAlternateTitle";
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");
CREATE TABLE "new_ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "country" TEXT,
    "logo" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProductionCompany" ("createdAt", "homepage", "id", "location", "logo", "name", "updatedAt") SELECT "createdAt", "homepage", "id", "location", "logo", "name", "updatedAt" FROM "ProductionCompany";
DROP TABLE "ProductionCompany";
ALTER TABLE "new_ProductionCompany" RENAME TO "ProductionCompany";
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");
CREATE UNIQUE INDEX "ProductionCompany_name_key" ON "ProductionCompany"("name");
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "language" TEXT,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "voteAverage" REAL NOT NULL DEFAULT 0,
    "voteCount" INTEGER DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL NOT NULL DEFAULT 0,
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
    "productionCountries" TEXT
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
CREATE TABLE "new_FilmReleaseInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "country" TEXT,
    "language" TEXT,
    "date" DATETIME NOT NULL,
    "classification" TEXT,
    "type" TEXT,
    "note" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReleaseInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmReleaseInformation" ("classification", "createdAt", "date", "filmId", "id", "locked", "note", "type", "updatedAt") SELECT "classification", "createdAt", "date", "filmId", "id", "locked", "note", "type", "updatedAt" FROM "FilmReleaseInformation";
DROP TABLE "FilmReleaseInformation";
ALTER TABLE "new_FilmReleaseInformation" RENAME TO "FilmReleaseInformation";
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
