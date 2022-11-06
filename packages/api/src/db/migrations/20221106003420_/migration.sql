/*
  Warnings:

  - You are about to drop the `Edit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Edit" DROP CONSTRAINT "Edit_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Edit" DROP CONSTRAINT "Edit_userId_fkey";

-- DropTable
DROP TABLE "Edit";

-- CreateTable
CREATE TABLE "MovieLog" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "movieId" UUID,
    "key" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MovieLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MovieLog" ADD CONSTRAINT "MovieLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieLog" ADD CONSTRAINT "MovieLog_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE SET NULL ON UPDATE CASCADE;
