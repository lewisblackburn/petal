-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmVersion" (
    "versionId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "versionOperation" TEXT NOT NULL,
    "versionFilmId" TEXT,
    "versionUserId" TEXT,
    "versionTimestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oldValues" TEXT,
    "newValues" TEXT NOT NULL,
    CONSTRAINT "FilmVersion_versionFilmId_fkey" FOREIGN KEY ("versionFilmId") REFERENCES "Film" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "FilmVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_FilmVersion" ("newValues", "oldValues", "versionFilmId", "versionId", "versionOperation", "versionTimestamp", "versionUserId") SELECT "newValues", "oldValues", "versionFilmId", "versionId", "versionOperation", "versionTimestamp", "versionUserId" FROM "FilmVersion";
DROP TABLE "FilmVersion";
ALTER TABLE "new_FilmVersion" RENAME TO "FilmVersion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
