/*
  Warnings:

  - You are about to drop the column `path` on the `Picture` table. All the data in the column will be lost.
  - Added the required column `data` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Picture` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tumbnailData` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Picture" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "tumbnailData" TEXT NOT NULL,
    "postId" INTEGER,
    CONSTRAINT "Picture_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Picture" ("id", "postId") SELECT "id", "postId" FROM "Picture";
DROP TABLE "Picture";
ALTER TABLE "new_Picture" RENAME TO "Picture";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
