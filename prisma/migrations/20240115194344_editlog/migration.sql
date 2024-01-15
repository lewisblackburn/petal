/*
  Warnings:

  - You are about to drop the column `action` on the `EditLog` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableName" TEXT,
    "columnName" TEXT,
    "columnId" TEXT,
    "oldData" TEXT DEFAULT '{}',
    "newData" TEXT DEFAULT '{}',
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_EditLog" ("columnId", "columnName", "createdAt", "id", "newData", "oldData", "tableName", "userId") SELECT "columnId", "columnName", "createdAt", "id", "newData", "oldData", "tableName", "userId" FROM "EditLog";
DROP TABLE "EditLog";
ALTER TABLE "new_EditLog" RENAME TO "EditLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
