/*
  Warnings:

  - You are about to drop the column `birthday` on the `Person` table. All the data in the column will be lost.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Person" ("biography", "createdAt", "dayOfDeath", "gender", "homepage", "id", "knownForDepartment", "name", "placeOfBirth", "updatedAt") SELECT "biography", "createdAt", "dayOfDeath", "gender", "homepage", "id", "knownForDepartment", "name", "placeOfBirth", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
