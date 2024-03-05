/*
  Warnings:

  - A unique constraint covering the columns `[azureId]` on the table `Attraction` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `azureId` to the `Attraction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attraction" ADD COLUMN     "azureId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attraction_azureId_key" ON "Attraction"("azureId");
