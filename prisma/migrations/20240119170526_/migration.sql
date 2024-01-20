/*
  Warnings:

  - The primary key for the `Keyword` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Keyword` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__FilmToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__FilmToKeyword" ("A", "B") SELECT "A", "B" FROM "_FilmToKeyword";
DROP TABLE "_FilmToKeyword";
ALTER TABLE "new__FilmToKeyword" RENAME TO "_FilmToKeyword";
CREATE UNIQUE INDEX "_FilmToKeyword_AB_unique" ON "_FilmToKeyword"("A", "B");
CREATE INDEX "_FilmToKeyword_B_index" ON "_FilmToKeyword"("B");
CREATE TABLE "new__SongToKeyword" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_SongToKeyword_A_fkey" FOREIGN KEY ("A") REFERENCES "Keyword" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToKeyword_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__SongToKeyword" ("A", "B") SELECT "A", "B" FROM "_SongToKeyword";
DROP TABLE "_SongToKeyword";
ALTER TABLE "new__SongToKeyword" RENAME TO "_SongToKeyword";
CREATE UNIQUE INDEX "_SongToKeyword_AB_unique" ON "_SongToKeyword"("A", "B");
CREATE INDEX "_SongToKeyword_B_index" ON "_SongToKeyword"("B");
CREATE TABLE "new_Keyword" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Keyword" ("createdAt", "name", "updatedAt") SELECT "createdAt", "name", "updatedAt" FROM "Keyword";
DROP TABLE "Keyword";
ALTER TABLE "new_Keyword" RENAME TO "Keyword";
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
