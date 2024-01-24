/*
  Warnings:

  - A unique constraint covering the columns `[imdbID]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wikiDataID]` on the table `Film` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tmdbID]` on the table `Film` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Film_imdbID_key" ON "Film"("imdbID");

-- CreateIndex
CREATE UNIQUE INDEX "Film_wikiDataID_key" ON "Film"("wikiDataID");

-- CreateIndex
CREATE UNIQUE INDEX "Film_tmdbID_key" ON "Film"("tmdbID");
