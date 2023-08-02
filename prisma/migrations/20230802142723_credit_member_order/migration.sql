-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditMember" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "order" INTEGER NOT NULL,
    "character" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "job" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "filmId" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    CONSTRAINT "CreditMember_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CreditMember_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditMember" ("character", "createdAt", "department", "filmId", "id", "job", "order", "personId", "updatedAt") SELECT "character", "createdAt", "department", "filmId", "id", "job", "order", "personId", "updatedAt" FROM "CreditMember";
DROP TABLE "CreditMember";
ALTER TABLE "new_CreditMember" RENAME TO "CreditMember";
CREATE UNIQUE INDEX "CreditMember_id_key" ON "CreditMember"("id");
CREATE UNIQUE INDEX "CreditMember_order_key" ON "CreditMember"("order");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
