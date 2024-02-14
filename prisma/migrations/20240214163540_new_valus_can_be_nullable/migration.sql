-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuditLog" (
    "auditId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "auditOperation" TEXT NOT NULL,
    "auditModelId" TEXT,
    "auditModelName" TEXT,
    "auditUserId" TEXT,
    "auditTimestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oldValues" TEXT,
    "newValues" TEXT,
    CONSTRAINT "AuditLog_auditUserId_fkey" FOREIGN KEY ("auditUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_AuditLog" ("auditId", "auditModelId", "auditModelName", "auditOperation", "auditTimestamp", "auditUserId", "newValues", "oldValues") SELECT "auditId", "auditModelId", "auditModelName", "auditOperation", "auditTimestamp", "auditUserId", "newValues", "oldValues" FROM "AuditLog";
DROP TABLE "AuditLog";
ALTER TABLE "new_AuditLog" RENAME TO "AuditLog";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
