/*
  Warnings:

  - You are about to drop the `_CountryToLangauge` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_CountryToLangauge";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_CountryToLanguage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CountryToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Country" ("countryCode") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CountryToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Langauge" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_CountryToLanguage_AB_unique" ON "_CountryToLanguage"("A", "B");

-- CreateIndex
CREATE INDEX "_CountryToLanguage_B_index" ON "_CountryToLanguage"("B");
