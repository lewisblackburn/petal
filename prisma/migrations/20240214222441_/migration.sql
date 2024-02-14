/*
  Warnings:

  - The primary key for the `FilmEdit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `FilmEdit` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmEdit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operation" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "filmId" TEXT NOT NULL,
    CONSTRAINT "FilmEdit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmEdit_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmEdit" ("createdAt", "filmId", "id", "newValues", "oldValues", "operation", "userId") SELECT "createdAt", "filmId", "id", "newValues", "oldValues", "operation", "userId" FROM "FilmEdit";
DROP TABLE "FilmEdit";
ALTER TABLE "new_FilmEdit" RENAME TO "FilmEdit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
