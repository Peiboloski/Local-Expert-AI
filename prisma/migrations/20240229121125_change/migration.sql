/*
  Warnings:

  - You are about to drop the column `bbox` on the `City` table. All the data in the column will be lost.
  - Added the required column `eastBound` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `northBound` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `southBound` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `westBound` to the `City` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" DROP COLUMN "bbox",
ADD COLUMN     "eastBound" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "northBound" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "southBound" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "westBound" DOUBLE PRECISION NOT NULL;
