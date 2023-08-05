/*
  Warnings:

  - Made the column `character` on table `CastMember` required. This step will fail if there are existing NULL values in that column.
  - Made the column `job` on table `CrewMember` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CastMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numerator" INTEGER NOT NULL,
    "denominator" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CastMember_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CastMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CastMember" ("character", "createdAt", "denominator", "filmId", "id", "numerator", "personId", "updatedAt") SELECT "character", "createdAt", "denominator", "filmId", "id", "numerator", "personId", "updatedAt" FROM "CastMember";
DROP TABLE "CastMember";
ALTER TABLE "new_CastMember" RENAME TO "CastMember";
CREATE UNIQUE INDEX "CastMember_id_key" ON "CastMember"("id");
CREATE TABLE "new_CrewMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CrewMember_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CrewMember" ("createdAt", "department", "featured", "filmId", "id", "job", "personId", "updatedAt") SELECT "createdAt", "department", "featured", "filmId", "id", "job", "personId", "updatedAt" FROM "CrewMember";
DROP TABLE "CrewMember";
ALTER TABLE "new_CrewMember" RENAME TO "CrewMember";
CREATE UNIQUE INDEX "CrewMember_id_key" ON "CrewMember"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
