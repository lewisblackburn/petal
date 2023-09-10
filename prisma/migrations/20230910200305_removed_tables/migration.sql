/*
  Warnings:

  - You are about to drop the `FilmView` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersonView` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `views` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Film` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "FilmView_id_key";

-- DropIndex
DROP INDEX "PersonView_id_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FilmView";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PersonView";
PRAGMA foreign_keys=on;

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
    "updatedAt" DATETIME NOT NULL,
    "image" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "views" INTEGER NOT NULL
);
INSERT INTO "new_Person" ("biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "updatedAt") SELECT "biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "tagline" TEXT,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "userScore" REAL NOT NULL DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL,
    "language" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "tmdbId" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "views" INTEGER NOT NULL
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "id", "instagram", "language", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "twitter", "updatedAt", "userScore", "website") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "id", "instagram", "language", "locked", "overview", "popularity", "poster", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbId", "trailer", "twitter", "updatedAt", "userScore", "website" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
