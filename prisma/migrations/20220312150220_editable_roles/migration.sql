/*
  Warnings:

  - Added the required column `editable` to the `ProjectRole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectRole" ADD COLUMN     "editable" BOOLEAN NOT NULL;
