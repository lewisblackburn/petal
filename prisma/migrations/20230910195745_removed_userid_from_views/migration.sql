/*
  Warnings:

  - You are about to drop the column `userId` on the `PersonView` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `FilmView` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PersonView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonView_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonView" ("createdAt", "id", "personId", "updatedAt") SELECT "createdAt", "id", "personId", "updatedAt" FROM "PersonView";
DROP TABLE "PersonView";
ALTER TABLE "new_PersonView" RENAME TO "PersonView";
CREATE UNIQUE INDEX "PersonView_id_key" ON "PersonView"("id");
CREATE TABLE "new_FilmView" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmView_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmView" ("createdAt", "filmId", "id", "updatedAt") SELECT "createdAt", "filmId", "id", "updatedAt" FROM "FilmView";
DROP TABLE "FilmView";
ALTER TABLE "new_FilmView" RENAME TO "FilmView";
CREATE UNIQUE INDEX "FilmView_id_key" ON "FilmView"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
