-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Note_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "NoteImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "noteId" TEXT NOT NULL,
    CONSTRAINT "NoteImage_noteId_fkey" FOREIGN KEY ("noteId") REFERENCES "Note" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "altText" TEXT,
    "contentType" TEXT NOT NULL,
    "blob" BLOB NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserImage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expirationDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "access" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Create Permissions
INSERT INTO Permission VALUES('clrnsxdsc0000gnf4og0vzt1a','create','user','own','',1705859877900,1705859877900);
INSERT INTO Permission VALUES('clrnsxdsh0001gnf463ashegk','create','user','any','',1705859877905,1705859877905);
INSERT INTO Permission VALUES('clrnsxdsm0002gnf4r8ugw2q5','read','user','own','',1705859877910,1705859877910);
INSERT INTO Permission VALUES('clrnsxdsq0003gnf4vhbzlk9j','read','user','any','',1705859877915,1705859877915);
INSERT INTO Permission VALUES('clrnsxdsv0004gnf4g5mxo2xn','update','user','own','',1705859877920,1705859877920);
INSERT INTO Permission VALUES('clrnsxdt00005gnf4yuobac43','update','user','any','',1705859877924,1705859877924);
INSERT INTO Permission VALUES('clrnsxdt50006gnf4wij7a4i7','delete','user','own','',1705859877929,1705859877929);
INSERT INTO Permission VALUES('clrnsxdt90007gnf4b3ynjvnr','delete','user','any','',1705859877934,1705859877934);

INSERT INTO Permission VALUES('clrnsxdte0008gnf4ubh5q7vb','create','note','own','',1705859877939,1705859877939);
INSERT INTO Permission VALUES('clrnsxdtj0009gnf46uxuqtni','create','note','any','',1705859877943,1705859877943);
INSERT INTO Permission VALUES('clrnsxdto000agnf4hh8y7u0p','read','note','own','',1705859877948,1705859877948);
INSERT INTO Permission VALUES('clrnsxdts000bgnf4pifq8pgd','read','note','any','',1705859877953,1705859877953);
INSERT INTO Permission VALUES('clrnsxdtx000cgnf4m48axmqw','update','note','own','',1705859877958,1705859877958);
INSERT INTO Permission VALUES('clrnsxdu2000dgnf4ztyjlu88','update','note','any','',1705859877962,1705859877962);
INSERT INTO Permission VALUES('clrnsxdu7000egnf4jtf1s1ab','delete','note','own','',1705859877967,1705859877967);
INSERT INTO Permission VALUES('clrnsxdub000fgnf4hwjjv1ou','delete','note','any','',1705859877972,1705859877972);

INSERT INTO Permission VALUES('clrnsxdug000ggnf4at7zq5j9','create','film','own','',1705859877977,1705859877977);
INSERT INTO Permission VALUES('clrnsxdul000hgnf4gzhoh15u','create','film','any','',1705859877981,1705859877981);
INSERT INTO Permission VALUES('clrnsxduq000ignf4cd1fnqq2','read','film','own','',1705859877986,1705859877986);
INSERT INTO Permission VALUES('clrnsxduu000jgnf4w2mi4k6d','read','film','any','',1705859877991,1705859877991);
INSERT INTO Permission VALUES('clrnsxduz000kgnf45t1xtn8a','update','film','own','',1705859877995,1705859877995);
INSERT INTO Permission VALUES('clrnsxdv4000lgnf48vnc18sq','update','film','any','',1705859878000,1705859878000);
INSERT INTO Permission VALUES('clrnsxdv8000mgnf4j136uo5v','delete','film','own','',1705859878005,1705859878005);
INSERT INTO Permission VALUES('clrnsxdvh000ngnf42p7ja7po','delete','film','any','',1705859878013,1705859878013);

INSERT INTO Permission VALUES('clrnsxdvl000ognf4ff7tpthv','create','review','own','',1705859878018,1705859878018);
INSERT INTO Permission VALUES('clrnsxdvq000pgnf4mxgm0l12','create','review','any','',1705859878023,1705859878023);
INSERT INTO Permission VALUES('clrnsxdvv000qgnf4ff5jvkza','read','review','own','',1705859878027,1705859878027);
INSERT INTO Permission VALUES('clrnsxdw0000rgnf4gat9d9zd','read','review','any','',1705859878032,1705859878032);
INSERT INTO Permission VALUES('clrnsxdw4000sgnf4mjtcn4j8','update','review','own','',1705859878037,1705859878037);
INSERT INTO Permission VALUES('clrnsxdw9000tgnf4en0fzv56','update','review','any','',1705859878042,1705859878042);
INSERT INTO Permission VALUES('clrnsxdwe000ugnf4z5z3kahx','delete','review','own','',1705859878046,1705859878046);
INSERT INTO Permission VALUES('clrnsxdwj000vgnf40cixwl3u','delete','review','any','',1705859878051,1705859878051);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- Create Roles
INSERT INTO Role VALUES('clrnsxdwo000wgnf44pcdcwa5','admin','',1705859878057,1705859878057);
INSERT INTO Role VALUES('clrnsxdwu000xgnf43y4nmolr','user','',1705859878062,1705859878062);

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "algorithm" TEXT NOT NULL,
    "digits" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "charSet" TEXT NOT NULL,
    "expiresAt" DATETIME
);

-- CreateTable
CREATE TABLE "Connection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "providerName" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Connection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "image" TEXT DEFAULT '/img/300x450.png'
);

-- CreateTable
CREATE TABLE "Film" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "releaseDate" DATETIME,
    "ageRating" TEXT,
    "runtime" REAL,
    "language" TEXT DEFAULT 'English',
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

-- CreateTable
CREATE TABLE "FilmRecommendation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "recommendedFilmId" TEXT NOT NULL,
    "similarity" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRecommendation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRecommendation_recommendedFilmId_fkey" FOREIGN KEY ("recommendedFilmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "CastMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "CrewMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FilmPhoto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "language" TEXT DEFAULT 'English',
    "primary" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmPhoto_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "primary" BOOLEAN DEFAULT false,
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
    "country" TEXT NOT NULL,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmAlternateTitle_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "country" TEXT,
    "language" TEXT DEFAULT 'English',
    "date" DATETIME NOT NULL,
    "classification" TEXT,
    "type" TEXT,
    "note" TEXT,
    "locked" BOOLEAN DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReleaseInformation_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductionCompany" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT,
    "country" TEXT,
    "logo" TEXT DEFAULT '/img/300x450.png',
    "homepage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
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
    "name" TEXT NOT NULL PRIMARY KEY,
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
CREATE TABLE "EditLog" (
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
    CONSTRAINT "Song_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    "cover" TEXT DEFAULT '/img/300x450.png',
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
    CONSTRAINT "Artist_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PermissionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PermissionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Permission" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PermissionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "_FilmToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("name") ON DELETE CASCADE ON UPDATE CASCADE
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
    CONSTRAINT "_SongToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AlbumToArtist" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AlbumToArtist_A_fkey" FOREIGN KEY ("A") REFERENCES "Album" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AlbumToArtist_B_fkey" FOREIGN KEY ("B") REFERENCES "Artist" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Note_ownerId_idx" ON "Note"("ownerId");

-- CreateIndex
CREATE INDEX "Note_ownerId_updatedAt_idx" ON "Note"("ownerId", "updatedAt");

-- CreateIndex
CREATE INDEX "NoteImage_noteId_idx" ON "NoteImage"("noteId");

-- CreateIndex
CREATE UNIQUE INDEX "UserImage_userId_key" ON "UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_action_entity_access_key" ON "Permission"("action", "entity", "access");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_target_type_key" ON "Verification"("target", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Connection_providerName_providerId_key" ON "Connection"("providerName", "providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Person_id_key" ON "Person"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_birthdate_key" ON "Person"("name", "birthdate");

-- CreateIndex
CREATE UNIQUE INDEX "Film_id_key" ON "Film"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FilmRecommendation_id_key" ON "FilmRecommendation"("id");

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
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

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
CREATE UNIQUE INDEX "_PermissionToRole_AB_unique" ON "_PermissionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermissionToRole_B_index" ON "_PermissionToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

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
