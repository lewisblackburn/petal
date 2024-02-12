/*
  Warnings:

  - You are about to drop the column `ageRating` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `backdrop` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `overview` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `poster` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `releaseDate` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `revenue` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `runtime` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `FilmVersion` table. All the data in the column will be lost.
  - You are about to drop the column `trailer` on the `FilmVersion` table. All the data in the column will be lost.
  - Added the required column `newValues` to the `FilmVersion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oldValues` to the `FilmVersion` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmVersion" (
    "versionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "versionOperation" TEXT NOT NULL,
    "versionFilmId" TEXT,
    "versionUserId" TEXT,
    "versionTimestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oldValues" TEXT NOT NULL,
    "newValues" TEXT NOT NULL,
    CONSTRAINT "FilmVersion_versionFilmId_fkey" FOREIGN KEY ("versionFilmId") REFERENCES "Film" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FilmVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FilmVersion" ("versionFilmId", "versionId", "versionOperation", "versionTimestamp", "versionUserId") SELECT "versionFilmId", "versionId", "versionOperation", "versionTimestamp", "versionUserId" FROM "FilmVersion";
DROP TABLE "FilmVersion";
ALTER TABLE "new_FilmVersion" RENAME TO "FilmVersion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
