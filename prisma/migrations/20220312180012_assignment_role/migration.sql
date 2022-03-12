/*
  Warnings:

  - You are about to drop the column `projectId` on the `ProjectRoleAssignment` table. All the data in the column will be lost.
  - Added the required column `projectId` to the `ProjectRole` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProjectRoleAssignment" DROP CONSTRAINT "ProjectRoleAssignment_projectId_fkey";

-- AlterTable
ALTER TABLE "ProjectRole" ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ProjectRoleAssignment" DROP COLUMN "projectId";

-- AddForeignKey
ALTER TABLE "ProjectRole" ADD CONSTRAINT "ProjectRole_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
