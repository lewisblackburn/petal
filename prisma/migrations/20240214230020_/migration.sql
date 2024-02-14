/*
  Warnings:

  - You are about to drop the column `filmCastMemberId` on the `FilmCastMemberEdit` table. All the data in the column will be lost.
  - Added the required column `filmId` to the `FilmCastMemberEdit` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmCastMemberEdit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operation" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "filmId" TEXT NOT NULL,
    CONSTRAINT "FilmCastMemberEdit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmCastMemberEdit_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FilmCastMemberEdit" ("createdAt", "id", "newValues", "oldValues", "operation", "userId") SELECT "createdAt", "id", "newValues", "oldValues", "operation", "userId" FROM "FilmCastMemberEdit";
DROP TABLE "FilmCastMemberEdit";
ALTER TABLE "new_FilmCastMemberEdit" RENAME TO "FilmCastMemberEdit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
