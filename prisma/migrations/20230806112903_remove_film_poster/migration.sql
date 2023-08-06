/*
  Warnings:

  - A unique constraint covering the columns `[filmId,primary,type]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photo_filmId_primary_type_key" ON "Photo"("filmId", "primary", "type");
