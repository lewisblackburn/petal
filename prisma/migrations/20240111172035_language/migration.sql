/*
  Warnings:

  - You are about to drop the column `language` on the `FilmAlternateTitle` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Langauge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CountryToLangauge" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLangauge_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLangauge_B_fkey" FOREIGN KEY ("B") REFERENCES "Langauge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmAlternateTitle_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmAlternateTitle" ("countryId", "createdAt", "filmId", "id", "locked", "title", "updatedAt") SELECT "countryId", "createdAt", "filmId", "id", "locked", "title", "updatedAt" FROM "FilmAlternateTitle";
DROP TABLE "FilmAlternateTitle";
ALTER TABLE "new_FilmAlternateTitle" RENAME TO "FilmAlternateTitle";
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Langauge_id_key" ON "Langauge"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToLangauge_AB_unique" ON "_CountryToLangauge"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToLangauge_B_index" ON "_CountryToLangauge"("B");
