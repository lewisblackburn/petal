-- CreateTable
CREATE TABLE "FilmCastMemberEdit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "operation" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "filmCastMemberId" TEXT NOT NULL,
    CONSTRAINT "FilmCastMemberEdit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FilmCastMemberEdit_filmCastMemberId_fkey" FOREIGN KEY ("filmCastMemberId") REFERENCES "FilmCastMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
