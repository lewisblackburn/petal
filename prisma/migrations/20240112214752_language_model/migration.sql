/*
  Warnings:

  - You are about to drop the column `language` on the `FilmReleaseInformation` table. All the data in the column will be lost.
  - Added the required column `languageId` to the `FilmReleaseInformation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmReleaseInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "classification" TEXT,
    "type" TEXT,
    "note" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReleaseInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmReleaseInformation" ("classification", "countryCode", "createdAt", "date", "filmId", "id", "locked", "note", "type", "updatedAt") SELECT "classification", "countryCode", "createdAt", "date", "filmId", "id", "locked", "note", "type", "updatedAt" FROM "FilmReleaseInformation";
DROP TABLE "FilmReleaseInformation";
ALTER TABLE "new_FilmReleaseInformation" RENAME TO "FilmReleaseInformation";
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
