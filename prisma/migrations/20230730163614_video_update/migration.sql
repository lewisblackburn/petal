/*
  Warnings:

  - You are about to drop the column `sourceKey` on the `Video` table. All the data in the column will be lost.

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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Video_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Video" ("createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt") SELECT "createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_id_key" ON "Video"("id");
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "knownForDepartment" TEXT,
    "image" TEXT DEFAULT 'https://via.placeholder.com/300x450.png',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Person" ("createdAt", "id", "image", "knownForDepartment", "name", "updatedAt") SELECT "createdAt", "id", "image", "knownForDepartment", "name", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
