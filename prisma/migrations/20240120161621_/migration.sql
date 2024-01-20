-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "country" TEXT,
    "logo" TEXT DEFAULT '/img/300x450.png',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_ProductionCompany" ("country", "createdAt", "homepage", "id", "location", "logo", "name", "updatedAt") SELECT "country", "createdAt", "homepage", "id", "location", "logo", "name", "updatedAt" FROM "ProductionCompany";
DROP TABLE "ProductionCompany";
ALTER TABLE "new_ProductionCompany" RENAME TO "ProductionCompany";
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");
CREATE UNIQUE INDEX "ProductionCompany_name_key" ON "ProductionCompany"("name");
CREATE TABLE "new_Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cover" TEXT DEFAULT '/img/300x450.png',
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Album" ("cover", "createdAt", "id", "locked", "title", "updatedAt", "year") SELECT "cover", "createdAt", "id", "locked", "title", "updatedAt", "year" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");
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
    "image" TEXT DEFAULT '/img/300x450.png'
);
INSERT INTO "new_Person" ("biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "updatedAt") SELECT "biography", "birthdate", "createdAt", "dayOfDeath", "gender", "homepage", "id", "image", "knownForDepartment", "name", "placeOfBirth", "updatedAt" FROM "Person";
DROP TABLE "Person";
ALTER TABLE "new_Person" RENAME TO "Person";
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");
CREATE UNIQUE INDEX "Person_name_birthdate_key" ON "Person"("name", "birthdate");
CREATE TABLE "new_Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "language" TEXT,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "voteAverage" REAL NOT NULL DEFAULT 0,
    "voteCount" INTEGER DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL NOT NULL DEFAULT 0,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "imdbID" TEXT,
    "wikiDataID" TEXT,
    "tmdbID" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "poster" TEXT DEFAULT '/img/300x450.png',
    "backdrop" TEXT DEFAULT '/img/1920x1080.png',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "tagline" TEXT,
    "productionCountries" TEXT
);
INSERT INTO "new_Film" ("ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "language", "locked", "overview", "popularity", "poster", "productionCountries", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID") SELECT "ageRating", "backdrop", "budget", "contentScore", "createdAt", "facebook", "id", "imdbID", "instagram", "language", "locked", "overview", "popularity", "poster", "productionCountries", "releaseDate", "revenue", "runtime", "status", "tagline", "title", "tmdbID", "trailer", "twitter", "updatedAt", "voteAverage", "voteCount", "website", "wikiDataID" FROM "Film";
DROP TABLE "Film";
ALTER TABLE "new_Film" RENAME TO "Film";
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
