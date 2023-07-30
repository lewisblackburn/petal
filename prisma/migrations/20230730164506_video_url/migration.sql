/*
  Warnings:

  - Added the required column `url` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "site" TEXT NOT NULL DEFAULT 'youtube',
    "type" TEXT NOT NULL DEFAULT 'trailer',
    "quality" TEXT DEFAULT 'HD',
    "name" TEXT NOT NULL DEFAULT 'Trailer',
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt") SELECT "createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
