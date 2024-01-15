/*
  Warnings:

  - You are about to drop the `AuditLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AuditLog";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "action" TEXT,
    "tableName" TEXT,
    "columnName" TEXT,
    "columnId" TEXT,
    "oldData" TEXT DEFAULT '{}',
    "newData" TEXT DEFAULT '{}',
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
