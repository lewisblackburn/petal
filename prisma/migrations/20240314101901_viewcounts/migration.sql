-- AlterTable
ALTER TABLE "Film" ADD COLUMN "viewCount" INTEGER DEFAULT 0;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Person" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "knownForDepartment" TEXT,
    "biography" TEXT,
    "birthdate" DATETIME,
    "dayOfDeath" DATETIME,
    "gender" TEXT,
    "placeOfBirth" TEXT,
    "homepage" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "tmdbID" TEXT,
    "image" TEXT DEFAULT '/img/300x450.png'
);
INSERT INTO "new_Person" ("biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "tmdbID", "updatedAt") SELECT "biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "tmdbID", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
CREATE UNIQUE INDEX "Person_tmdbID_key" ON "Person"("tmdbID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
