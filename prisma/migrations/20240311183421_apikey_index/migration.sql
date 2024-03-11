/*
  Warnings:

  - A unique constraint covering the columns `[key,userId]` on the table `ApiKey` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "ApiKey_key_idx" ON "ApiKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_key_userId_key" ON "ApiKey"("key", "userId");
