/*
  Warnings:

  - Added the required column `url` to the `PersonImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `FilmPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "primary" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonImage" ("createdAt", "filename", "id", "personId", "primary", "updatedAt") SELECT "createdAt", "filename", "id", "personId", "primary", "updatedAt" FROM "PersonImage";
DROP TABLE "PersonImage";
ALTER TABLE "new_PersonImage" RENAME TO "PersonImage";
CREATE UNIQUE INDEX "PersonImage_id_key" ON "PersonImage"("id");
CREATE TABLE "new_FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "primary" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmPhoto" ("createdAt", "filename", "filmId", "id", "language", "primary", "type", "updatedAt") SELECT "createdAt", "filename", "filmId", "id", "language", "primary", "type", "updatedAt" FROM "FilmPhoto";
DROP TABLE "FilmPhoto";
ALTER TABLE "new_FilmPhoto" RENAME TO "FilmPhoto";
CREATE UNIQUE INDEX "FilmPhoto_id_key" ON "FilmPhoto"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
