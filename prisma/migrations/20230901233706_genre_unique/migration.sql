/*
  Warnings:

  - You are about to alter the column `value` on the `FilmRating` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - A unique constraint covering the columns `[name]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmRating" (
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmRating" ("createdAt", "filmId", "updatedAt", "userId", "value") SELECT "createdAt", "filmId", "updatedAt", "userId", "value" FROM "FilmRating";
DROP TABLE "FilmRating";
ALTER TABLE "new_FilmRating" RENAME TO "FilmRating";
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
