/*
  Warnings:

  - You are about to drop the `MovieLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'PERSON');

-- DropForeignKey
ALTER TABLE "MovieLog" DROP CONSTRAINT "MovieLog_movieId_fkey";

-- DropForeignKey
ALTER TABLE "MovieLog" DROP CONSTRAINT "MovieLog_userId_fkey";

-- DropTable
DROP TABLE "MovieLog";

-- CreateTable
CREATE TABLE "Log" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "type" "MediaType" NOT NULL,
    "mediaId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "previousValue" TEXT,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
