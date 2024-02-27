'use server'

import { createCity, getCityByBbox } from "@/app/_database/city";
import logger from "@/logger";
import { City } from "@prisma/client";
import { redirect } from "next/navigation";

const getLocationCityPage = async (lat: string, lon: string) => {
    const config = {
        "api-version": '2023-06-01',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        "coordinates": `${lon},${lat}`,
        "resulTypes": 'PopulatedPlace'
    };

    logger.info('Fetching city from coordinates');

    const params = new URLSearchParams(config).toString();
    const response = await fetch(`https://atlas.microsoft.com/reverseGeocode?${params}`);

    if (!response.ok) {
        logger.error({
            message: 'Error fetching city',
            response: response
        });
        return ''
    }

    const responseBody = await response.json();
    if (responseBody.features.length === 0) {
        //TODO: Handle not detected municipality
        logger.error(`No municipality detected in location ${lat}, ${lon}`);
    }

    const city: Partial<City> = {
        name: responseBody.features[0].properties.address.locality,
        country: responseBody.features[0].properties.address.countryRegion.name,
        bbox: responseBody.features[0].bbox,
    }

    //Check if city already exists in database
    let databaseCity = await getCityByBbox(city.bbox as []);
    if (!databaseCity) {
        //Create city in database
        databaseCity = await createCity(city as City);
    }

    //reedirect to city page
    redirect(`/city/${databaseCity.id}/summary`);
}







export { getLocationCityPage }