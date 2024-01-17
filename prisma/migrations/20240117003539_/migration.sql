/*
  Warnings:

  - Added the required column `recommendedFilmId` to the `FilmRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "recommendedFilmId" TEXT NOT NULL,
    "similarity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRecommendation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmRecommendation_recommendedFilmId_fkey" FOREIGN KEY ("recommendedFilmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmRecommendation" ("createdAt", "filmId", "id", "similarity", "updatedAt") SELECT "createdAt", "filmId", "id", "similarity", "updatedAt" FROM "FilmRecommendation";
DROP TABLE "FilmRecommendation";
ALTER TABLE "new_FilmRecommendation" RENAME TO "FilmRecommendation";
CREATE UNIQUE INDEX "FilmRecommendation_id_key" ON "FilmRecommendation"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
