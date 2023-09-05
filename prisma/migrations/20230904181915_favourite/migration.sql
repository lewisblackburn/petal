/*
  Warnings:

  - You are about to drop the `PersonPhoto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "PersonPhoto";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PersonImage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "personId" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PersonImage_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favourite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filmId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Favourite_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favourite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonImage_id_key" ON "PersonImage"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favourite_id_key" ON "Favourite"("id");
