/*
  Warnings:

  - You are about to drop the column `countryId` on the `FilmReleaseInformation` table. All the data in the column will be lost.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Country` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `FilmAlternateTitle` table. All the data in the column will be lost.
  - Added the required column `countryCode` to the `FilmReleaseInformation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryCode` to the `FilmAlternateTitle` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__CountryToLangauge" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLangauge_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("countryCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLangauge_B_fkey" FOREIGN KEY ("B") REFERENCES "Langauge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__CountryToLangauge" ("A", "B") SELECT "A", "B" FROM "_CountryToLangauge";
DROP TABLE "_CountryToLangauge";
ALTER TABLE "new__CountryToLangauge" RENAME TO "_CountryToLangauge";
CREATE UNIQUE INDEX "_CountryToLangauge_AB_unique" ON "_CountryToLangauge"("A", "B");
CREATE INDEX "_CountryToLangauge_B_index" ON "_CountryToLangauge"("B");
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
    CONSTRAINT "FilmReleaseInformation_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("countryCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmReleaseInformation" ("classification", "createdAt", "date", "filmId", "id", "language", "locked", "note", "type", "updatedAt") SELECT "classification", "createdAt", "date", "filmId", "id", "language", "locked", "note", "type", "updatedAt" FROM "FilmReleaseInformation";
DROP TABLE "FilmReleaseInformation";
ALTER TABLE "new_FilmReleaseInformation" RENAME TO "FilmReleaseInformation";
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");
CREATE TABLE "new_Country" (
    "countryCode" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Country" ("countryCode", "createdAt", "flag", "name", "updatedAt") SELECT "countryCode", "createdAt", "flag", "name", "updatedAt" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
CREATE TABLE "new_FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmAlternateTitle_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("countryCode") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmAlternateTitle" ("createdAt", "filmId", "id", "locked", "title", "updatedAt") SELECT "createdAt", "filmId", "id", "locked", "title", "updatedAt" FROM "FilmAlternateTitle";
DROP TABLE "FilmAlternateTitle";
ALTER TABLE "new_FilmAlternateTitle" RENAME TO "FilmAlternateTitle";
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
