/*
  Warnings:

  - A unique constraint covering the columns `[name,birthdate]` on the table `Person` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Person_name_idx";

-- CreateIndex
CREATE UNIQUE INDEX "Person_name_birthdate_key" ON "Person"("name", "birthdate");
