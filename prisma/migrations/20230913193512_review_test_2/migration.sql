-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FilmReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmReview_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmReview" ("content", "createdAt", "filmId", "id", "title", "updatedAt", "userId") SELECT "content", "createdAt", "filmId", "id", "title", "updatedAt", "userId" FROM "FilmReview";
DROP TABLE "FilmReview";
ALTER TABLE "new_FilmReview" RENAME TO "FilmReview";
CREATE UNIQUE INDEX "FilmReview_id_key" ON "FilmReview"("id");
CREATE UNIQUE INDEX "FilmReview_filmId_userId_key" ON "FilmReview"("filmId", "userId");
CREATE TABLE "new_FilmRating" (
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmReviewId" TEXT,
    CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_filmId_userId_fkey" FOREIGN KEY ("filmId", "userId") REFERENCES "FilmReview" ("filmId", "userId") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FilmRating" ("createdAt", "filmId", "updatedAt", "userId", "value") SELECT "createdAt", "filmId", "updatedAt", "userId", "value" FROM "FilmRating";
DROP TABLE "FilmRating";
ALTER TABLE "new_FilmRating" RENAME TO "FilmRating";
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
