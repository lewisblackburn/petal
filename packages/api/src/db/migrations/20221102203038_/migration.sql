/*
  Warnings:

  - You are about to drop the column `platform` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "platform";

-- DropEnum
DROP TYPE "Platform";

-- CreateTable
CREATE TABLE "Platform" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "movieId" UUID,

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlatformOnMovie" (
    "platformId" UUID NOT NULL,
    "movieId" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlatformOnMovie_platformId_movieId_key" ON "PlatformOnMovie"("platformId", "movieId");

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformOnMovie" ADD CONSTRAINT "PlatformOnMovie_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlatformOnMovie" ADD CONSTRAINT "PlatformOnMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
