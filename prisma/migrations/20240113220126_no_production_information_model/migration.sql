/*
  Warnings:

  - You are about to drop the `FilmProductionInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CountryToFilmProductionInformation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FilmProductionInformationToProductionCompany` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "FilmProductionInformation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToFilmProductionInformation";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_FilmProductionInformationToProductionCompany";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_FilmToProductionCompany" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmToProductionCompany_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmToProductionCompany_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductionCompany" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CountryToFilm" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToFilm_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("code") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToFilm_B_fkey" FOREIGN KEY ("B") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToProductionCompany_AB_unique" ON "_FilmToProductionCompany"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToProductionCompany_B_index" ON "_FilmToProductionCompany"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToFilm_AB_unique" ON "_CountryToFilm"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToFilm_B_index" ON "_CountryToFilm"("B");
