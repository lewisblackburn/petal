-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT,
    "language" TEXT,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmPhoto" ("createdAt", "filmId", "id", "image", "language", "type", "updatedAt") SELECT "createdAt", "filmId", "id", "image", "language", "type", "updatedAt" FROM "FilmPhoto";
DROP TABLE "FilmPhoto";
ALTER TABLE "new_FilmPhoto" RENAME TO "FilmPhoto";
CREATE UNIQUE INDEX "FilmPhoto_id_key" ON "FilmPhoto"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
