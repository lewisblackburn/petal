-- CreateTable
CREATE TABLE "Person" (
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

-- CreateTable
CREATE TABLE "Film" (
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
    "userScore" REAL,
    "contentScore" REAL,
    "popularity" REAL,
    "language" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "website" TEXT,
    "tmdbId" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CastMember" (
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

-- CreateTable
CREATE TABLE "CrewMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "featured" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CrewMember_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "language" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonPhoto_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "site" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quality" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmVideo_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_FilmToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FilmToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CastMember_id_key" ON "CastMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CrewMember_id_key" ON "CrewMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmPhoto_id_key" ON "FilmPhoto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonPhoto_id_key" ON "PersonPhoto"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmVideo_id_key" ON "FilmVideo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_id_key" ON "Keyword"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToGenre_AB_unique" ON "_FilmToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToGenre_B_index" ON "_FilmToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToKeyword_AB_unique" ON "_FilmToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToKeyword_B_index" ON "_FilmToKeyword"("B");
