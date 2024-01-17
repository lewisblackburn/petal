/*
  Warnings:

  - The primary key for the `FilmRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FilmRecommendation` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmRecommendation" (
    "filmId" TEXT NOT NULL PRIMARY KEY,
    "similarity" REAL NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRecommendation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmRecommendation" ("createdAt", "filmId", "similarity", "updatedAt") SELECT "createdAt", "filmId", "similarity", "updatedAt" FROM "FilmRecommendation";
DROP TABLE "FilmRecommendation";
ALTER TABLE "new_FilmRecommendation" RENAME TO "FilmRecommendation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
