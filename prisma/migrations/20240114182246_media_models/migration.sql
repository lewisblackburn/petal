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
    "updatedAt" DATETIME NOT NULL,
    "image" TEXT DEFAULT 'https://placehold.co/300x450?text=Image'
);

-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "languageId" TEXT,
    "budget" REAL,
    "revenue" REAL,
    "status" TEXT,
    "userScore" REAL NOT NULL DEFAULT 0,
    "contentScore" REAL,
    "popularity" REAL,
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
    "poster" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "backdrop" TEXT DEFAULT 'https://placehold.co/1920x1080?text=Image',
    "trailer" TEXT DEFAULT 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    "tagline" TEXT DEFAULT '',
    CONSTRAINT "Film_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE SET NULL ON UPDATE CASCADE
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
    "language" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmVideo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
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
CREATE TABLE "FilmRating" (
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReview_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReview_filmId_userId_fkey" FOREIGN KEY ("filmId", "userId") REFERENCES "FilmRating" ("filmId", "userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmAlternateTitle_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmTagline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmTagline_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmReleaseInformation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "classification" TEXT,
    "type" TEXT,
    "note" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReleaseInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "countryCode" TEXT,
    "logo" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductionCompany_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE SET NULL ON UPDATE CASCADE
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
CREATE TABLE "FilmFavourite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmFavourite_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SongFavourite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SongFavourite_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "changes" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "albumId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SongRating" (
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SongRating_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SongReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SongReview_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongReview_songId_userId_fkey" FOREIGN KEY ("songId", "userId") REFERENCES "SongRating" ("songId", "userId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "cover" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Artist_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "flag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nativeName" TEXT NOT NULL
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

-- CreateTable
CREATE TABLE "_FilmToProductionCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SongToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SongToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Genre" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_SongToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SongToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AlbumToArtist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AlbumToArtist_A_fkey" FOREIGN KEY ("A") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlbumToArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToFilm" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToFilm_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToFilm_B_fkey" FOREIGN KEY ("B") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
CREATE UNIQUE INDEX "PersonImage_id_key" ON "PersonImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmVideo_id_key" ON "FilmVideo"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "FilmReview_id_key" ON "FilmReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmReview_filmId_userId_key" ON "FilmReview"("filmId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmTagline_id_key" ON "FilmTagline"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ProductionCompany_name_key" ON "ProductionCompany"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_id_key" ON "Keyword"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "FilmFavourite_id_key" ON "FilmFavourite"("id");

-- CreateIndex
CREATE INDEX "FilmFavourite_filmId_userId_idx" ON "FilmFavourite"("filmId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SongFavourite_id_key" ON "SongFavourite"("id");

-- CreateIndex
CREATE INDEX "SongFavourite_songId_userId_idx" ON "SongFavourite"("songId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Song_id_key" ON "Song"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SongRating_songId_userId_key" ON "SongRating"("songId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SongReview_id_key" ON "SongReview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SongReview_songId_userId_key" ON "SongReview"("songId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_id_key" ON "Language"("id");

-- CreateIndex
CREATE INDEX "Language_name_idx" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToGenre_AB_unique" ON "_FilmToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToGenre_B_index" ON "_FilmToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToKeyword_AB_unique" ON "_FilmToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToKeyword_B_index" ON "_FilmToKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToProductionCompany_AB_unique" ON "_FilmToProductionCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToProductionCompany_B_index" ON "_FilmToProductionCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SongToGenre_AB_unique" ON "_SongToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToGenre_B_index" ON "_SongToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SongToKeyword_AB_unique" ON "_SongToKeyword"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToKeyword_B_index" ON "_SongToKeyword"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AlbumToArtist_AB_unique" ON "_AlbumToArtist"("A", "B");

-- CreateIndex
CREATE INDEX "_AlbumToArtist_B_index" ON "_AlbumToArtist"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToLanguage_AB_unique" ON "_CountryToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToLanguage_B_index" ON "_CountryToLanguage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToFilm_AB_unique" ON "_CountryToFilm"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToFilm_B_index" ON "_CountryToFilm"("B");
