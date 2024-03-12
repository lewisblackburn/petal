-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmEdit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "model" TEXT NOT NULL,
    "operation" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "filmId" TEXT NOT NULL,
    CONSTRAINT "FilmEdit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE CASCADE,
    CONSTRAINT "FilmEdit_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmEdit" ("createdAt", "filmId", "id", "model", "newValues", "oldValues", "operation", "userId") SELECT "createdAt", "filmId", "id", "model", "newValues", "oldValues", "operation", "userId" FROM "FilmEdit";
DROP TABLE "FilmEdit";
ALTER TABLE "new_FilmEdit" RENAME TO "FilmEdit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
