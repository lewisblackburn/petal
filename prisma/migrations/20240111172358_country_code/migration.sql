/*
  Warnings:

  - Added the required column `countryCode` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Country" ("createdAt", "flag", "id", "name", "updatedAt") SELECT "createdAt", "flag", "id", "name", "updatedAt" FROM "Country";
DROP TABLE "Country";
ALTER TABLE "new_Country" RENAME TO "Country";
CREATE UNIQUE INDEX "Country_id_key" ON "Country"("id");
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");
CREATE UNIQUE INDEX "Country_countryCode_key" ON "Country"("countryCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
