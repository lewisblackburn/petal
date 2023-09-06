/*
  Warnings:

  - You are about to drop the column `primary` on the `PersonImage` table. All the data in the column will be lost.
  - You are about to drop the column `primary` on the `FilmVideo` table. All the data in the column will be lost.
  - You are about to drop the column `primary` on the `FilmPhoto` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonImage" ("createdAt", "id", "image", "personId", "updatedAt") SELECT "createdAt", "id", "image", "personId", "updatedAt" FROM "PersonImage";
DROP TABLE "PersonImage";
ALTER TABLE "new_PersonImage" RENAME TO "PersonImage";
CREATE UNIQUE INDEX "PersonImage_id_key" ON "PersonImage"("id");
CREATE TABLE "new_FilmVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmVideo_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmVideo" ("createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt", "url") SELECT "createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt", "url" FROM "FilmVideo";
DROP TABLE "FilmVideo";
ALTER TABLE "new_FilmVideo" RENAME TO "FilmVideo";
CREATE UNIQUE INDEX "FilmVideo_id_key" ON "FilmVideo"("id");
CREATE TABLE "new_FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmPhoto" ("createdAt", "filmId", "id", "image", "language", "type", "updatedAt") SELECT "createdAt", "filmId", "id", "image", "language", "type", "updatedAt" FROM "FilmPhoto";
DROP TABLE "FilmPhoto";
ALTER TABLE "new_FilmPhoto" RENAME TO "FilmPhoto";
CREATE UNIQUE INDEX "FilmPhoto_id_key" ON "FilmPhoto"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
