/*
  Warnings:

  - Added the required column `shortDescription` to the `Attraction` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Attraction" ADD COLUMN     "mustVisit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mustVisitOrder" INTEGER,
ADD COLUMN     "shortDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "description" SET NOT NULL;
