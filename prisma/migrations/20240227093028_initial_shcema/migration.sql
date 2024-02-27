-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "formattedAddress" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "bbox" DOUBLE PRECISION[],
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "topLeft" DOUBLE PRECISION[],
    "bottomRight" DOUBLE PRECISION[],

    CONSTRAINT "Attraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attraction" ADD CONSTRAINT "Attraction_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
