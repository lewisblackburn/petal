-- CreateTable
CREATE TABLE "FilmRating" (
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FilmRating_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FilmRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "FilmRating_filmId_userId_key" ON "FilmRating"("filmId", "userId");
