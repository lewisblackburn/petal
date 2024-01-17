-- CreateTable
CREATE TABLE "_FilmRecommendations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FilmRecommendations_A_fkey" FOREIGN KEY ("A") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FilmRecommendations_B_fkey" FOREIGN KEY ("B") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FilmRecommendations_AB_unique" ON "_FilmRecommendations"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmRecommendations_B_index" ON "_FilmRecommendations"("B");
