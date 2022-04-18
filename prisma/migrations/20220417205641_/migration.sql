/*
  Warnings:

  - You are about to drop the column `userLevel` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "privilege" TEXT NOT NULL DEFAULT 'Aucun',
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "passhash" TEXT NOT NULL,
    "token" TEXT
);
INSERT INTO "new_User" ("email", "id", "nom", "passhash", "prenom", "token") SELECT "email", "id", "nom", "passhash", "prenom", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
