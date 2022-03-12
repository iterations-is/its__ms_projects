/*
  Warnings:

  - Added the required column `archived` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deleted` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionPrivate` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionPublic` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinable` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `searchable` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleted" BOOLEAN NOT NULL,
ADD COLUMN     "descriptionPrivate" TEXT NOT NULL,
ADD COLUMN     "descriptionPublic" TEXT NOT NULL,
ADD COLUMN     "joinable" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL,
ADD COLUMN     "searchable" BOOLEAN NOT NULL;
