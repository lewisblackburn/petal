-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmTagline" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmTagline_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmTagline" ("createdAt", "filmId", "id", "tagline", "updatedAt") SELECT "createdAt", "filmId", "id", "tagline", "updatedAt" FROM "FilmTagline";
DROP TABLE "FilmTagline";
ALTER TABLE "new_FilmTagline" RENAME TO "FilmTagline";
CREATE UNIQUE INDEX "FilmTagline_id_key" ON "FilmTagline"("id");
CREATE TABLE "new_FilmAlternateTitle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmAlternateTitle_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_FilmAlternateTitle" ("countryCode", "createdAt", "filmId", "id", "locked", "title", "updatedAt") SELECT "countryCode", "createdAt", "filmId", "id", "locked", "title", "updatedAt" FROM "FilmAlternateTitle";
DROP TABLE "FilmAlternateTitle";
ALTER TABLE "new_FilmAlternateTitle" RENAME TO "FilmAlternateTitle";
CREATE UNIQUE INDEX "FilmAlternateTitle_id_key" ON "FilmAlternateTitle"("id");
CREATE TABLE "new_Song" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "albumId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Song" ("albumId", "artist", "createdAt", "duration", "id", "locked", "title", "updatedAt") SELECT "albumId", "artist", "createdAt", "duration", "id", "locked", "title", "updatedAt" FROM "Song";
DROP TABLE "Song";
ALTER TABLE "new_Song" RENAME TO "Song";
CREATE UNIQUE INDEX "Song_id_key" ON "Song"("id");
CREATE TABLE "new_Artist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Artist_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Artist" ("createdAt", "id", "locked", "name", "personId", "updatedAt") SELECT "createdAt", "id", "locked", "name", "personId", "updatedAt" FROM "Artist";
DROP TABLE "Artist";
ALTER TABLE "new_Artist" RENAME TO "Artist";
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");
CREATE TABLE "new_ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "countryCode" TEXT,
    "logo" TEXT DEFAULT 'https://placehold.co/300x450?text=Image',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductionCompany_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ProductionCompany" ("countryCode", "createdAt", "homepage", "id", "location", "logo", "name", "updatedAt") SELECT "countryCode", "createdAt", "homepage", "id", "location", "logo", "name", "updatedAt" FROM "ProductionCompany";
DROP TABLE "ProductionCompany";
ALTER TABLE "new_ProductionCompany" RENAME TO "ProductionCompany";
CREATE UNIQUE INDEX "ProductionCompany_id_key" ON "ProductionCompany"("id");
CREATE UNIQUE INDEX "ProductionCompany_name_key" ON "ProductionCompany"("name");
CREATE TABLE "new_FilmRating" (
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmRating" ("createdAt", "filmId", "updatedAt", "userId", "value") SELECT "createdAt", "filmId", "updatedAt", "userId", "value" FROM "FilmRating";
DROP TABLE "FilmRating";
ALTER TABLE "new_FilmRating" RENAME TO "FilmRating";
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");
CREATE TABLE "new_PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PersonImage" ("createdAt", "id", "image", "personId", "updatedAt") SELECT "createdAt", "id", "image", "personId", "updatedAt" FROM "PersonImage";
DROP TABLE "PersonImage";
ALTER TABLE "new_PersonImage" RENAME TO "PersonImage";
CREATE UNIQUE INDEX "PersonImage_id_key" ON "PersonImage"("id");
CREATE TABLE "new_SongFavourite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SongFavourite_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SongFavourite" ("createdAt", "id", "songId", "updatedAt", "userId") SELECT "createdAt", "id", "songId", "updatedAt", "userId" FROM "SongFavourite";
DROP TABLE "SongFavourite";
ALTER TABLE "new_SongFavourite" RENAME TO "SongFavourite";
CREATE UNIQUE INDEX "SongFavourite_id_key" ON "SongFavourite"("id");
CREATE INDEX "SongFavourite_songId_userId_idx" ON "SongFavourite"("songId", "userId");
CREATE TABLE "new_FilmFavourite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmFavourite_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmFavourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmFavourite" ("createdAt", "filmId", "id", "updatedAt", "userId") SELECT "createdAt", "filmId", "id", "updatedAt", "userId" FROM "FilmFavourite";
DROP TABLE "FilmFavourite";
ALTER TABLE "new_FilmFavourite" RENAME TO "FilmFavourite";
CREATE UNIQUE INDEX "FilmFavourite_id_key" ON "FilmFavourite"("id");
CREATE INDEX "FilmFavourite_filmId_userId_idx" ON "FilmFavourite"("filmId", "userId");
CREATE TABLE "new_EditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableName" TEXT,
    "columnName" TEXT,
    "columnId" TEXT,
    "oldData" TEXT DEFAULT '{}',
    "newData" TEXT DEFAULT '{}',
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
);
INSERT INTO "new_EditLog" ("columnId", "columnName", "createdAt", "id", "newData", "oldData", "tableName", "userId") SELECT "columnId", "columnName", "createdAt", "id", "newData", "oldData", "tableName", "userId" FROM "EditLog";
DROP TABLE "EditLog";
ALTER TABLE "new_EditLog" RENAME TO "EditLog";
CREATE TABLE "new_FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmPhoto" ("createdAt", "filmId", "id", "image", "language", "type", "updatedAt") SELECT "createdAt", "filmId", "id", "image", "language", "type", "updatedAt" FROM "FilmPhoto";
DROP TABLE "FilmPhoto";
ALTER TABLE "new_FilmPhoto" RENAME TO "FilmPhoto";
CREATE UNIQUE INDEX "FilmPhoto_id_key" ON "FilmPhoto"("id");
CREATE TABLE "new_FilmReleaseInformation" (
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
    CONSTRAINT "FilmReleaseInformation_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReleaseInformation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmReleaseInformation" ("classification", "countryCode", "createdAt", "date", "filmId", "id", "languageId", "locked", "note", "type", "updatedAt") SELECT "classification", "countryCode", "createdAt", "date", "filmId", "id", "languageId", "locked", "note", "type", "updatedAt" FROM "FilmReleaseInformation";
DROP TABLE "FilmReleaseInformation";
ALTER TABLE "new_FilmReleaseInformation" RENAME TO "FilmReleaseInformation";
CREATE UNIQUE INDEX "FilmReleaseInformation_id_key" ON "FilmReleaseInformation"("id");
CREATE TABLE "new_SongReview" (
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
INSERT INTO "new_SongReview" ("content", "createdAt", "id", "songId", "title", "updatedAt", "userId") SELECT "content", "createdAt", "id", "songId", "title", "updatedAt", "userId" FROM "SongReview";
DROP TABLE "SongReview";
ALTER TABLE "new_SongReview" RENAME TO "SongReview";
CREATE UNIQUE INDEX "SongReview_id_key" ON "SongReview"("id");
CREATE UNIQUE INDEX "SongReview_songId_userId_key" ON "SongReview"("songId", "userId");
CREATE TABLE "new_FilmVideo" (
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
INSERT INTO "new_FilmVideo" ("createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt", "url") SELECT "createdAt", "filmId", "id", "name", "quality", "site", "type", "updatedAt", "url" FROM "FilmVideo";
DROP TABLE "FilmVideo";
ALTER TABLE "new_FilmVideo" RENAME TO "FilmVideo";
CREATE UNIQUE INDEX "FilmVideo_id_key" ON "FilmVideo"("id");
CREATE TABLE "new_FilmRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "recommendedFilmId" TEXT NOT NULL,
    "similarity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRecommendation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRecommendation_recommendedFilmId_fkey" FOREIGN KEY ("recommendedFilmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmRecommendation" ("createdAt", "filmId", "id", "recommendedFilmId", "similarity", "updatedAt") SELECT "createdAt", "filmId", "id", "recommendedFilmId", "similarity", "updatedAt" FROM "FilmRecommendation";
DROP TABLE "FilmRecommendation";
ALTER TABLE "new_FilmRecommendation" RENAME TO "FilmRecommendation";
CREATE UNIQUE INDEX "FilmRecommendation_id_key" ON "FilmRecommendation"("id");
CREATE TABLE "new_SongRating" (
    "songId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SongRating_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SongRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_SongRating" ("createdAt", "songId", "updatedAt", "userId", "value") SELECT "createdAt", "songId", "updatedAt", "userId", "value" FROM "SongRating";
DROP TABLE "SongRating";
ALTER TABLE "new_SongRating" RENAME TO "SongRating";
CREATE UNIQUE INDEX "SongRating_songId_userId_key" ON "SongRating"("songId", "userId");
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
    CONSTRAINT "CastMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CastMember" ("character", "createdAt", "denominator", "filmId", "id", "numerator", "personId", "updatedAt") SELECT "character", "createdAt", "denominator", "filmId", "id", "numerator", "personId", "updatedAt" FROM "CastMember";
DROP TABLE "CastMember";
ALTER TABLE "new_CastMember" RENAME TO "CastMember";
CREATE UNIQUE INDEX "CastMember_id_key" ON "CastMember"("id");
CREATE TABLE "new_CrewMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "department" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "featured" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CrewMember_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CrewMember" ("createdAt", "department", "featured", "filmId", "id", "job", "personId", "updatedAt") SELECT "createdAt", "department", "featured", "filmId", "id", "job", "personId", "updatedAt" FROM "CrewMember";
DROP TABLE "CrewMember";
ALTER TABLE "new_CrewMember" RENAME TO "CrewMember";
CREATE UNIQUE INDEX "CrewMember_id_key" ON "CrewMember"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
