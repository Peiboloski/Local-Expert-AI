'use server'

import { createCity, getCityByBbox } from "@/app/_database/city";
import logger from "@/logger";
import { City } from "@prisma/client";
import { redirect } from "next/navigation";

const getLocationCityPage = async (lat: string, lon: string) => {

    let { cityName, cityCountry, formattedName } = await getCityNameFromCoordinates(lat, lon);
    let { northBound, southBound, eastBound, westBound } = await getCityBboxFromFormattedName(formattedName);

    const city: Partial<City> = {
        name: cityName,
        country: cityCountry,
        northBound: northBound,
        southBound: southBound,
        eastBound: eastBound,
        westBound: westBound,
    }

    //Check if city already exists in database
    let databaseCity = await getCityByBbox({ northBound, southBound, eastBound, westBound });
    if (!databaseCity) {
        //Create city in database
        databaseCity = await createCity(city as City);
    }

    //reedirect to city page
    redirect(`/city/${databaseCity.id}/summary`);
}

const getCityBboxFromFormattedName = async (formattedName: string) => {
    const config = {
        "api-version": '1.0',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        "query": formattedName,
        "limit": '1',
    };

    const params = new URLSearchParams(config).toString();
    const response = await fetch(`https://atlas.microsoft.com/search/address/json?${params}`);

    if (!response.ok) {
        //TODO: Handle not found BBOX
        logger.error({
            message: 'Error fetching city bbox',
            response: response
        });
        return {}
    }

    const responseBody = await response.json();

    return {
        northBound: responseBody.results[0].boundingBox.topLeftPoint.lat,
        southBound: responseBody.results[0].boundingBox.btmRightPoint.lat,
        eastBound: responseBody.results[0].boundingBox.btmRightPoint.lon,
        westBound: responseBody.results[0].boundingBox.topLeftPoint.lon

    }
}


const getCityNameFromCoordinates = async (lat: string, lon: string) => {
    let cityName;
    let cityCountry;
    let formattedName;
    const config = {
        "api-version": '2023-06-01',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        "coordinates": `${lon},${lat}`,
        "resultTypes": 'PopulatedPlace'
    };

    logger.info('Fetching city name from coordinates');

    const params = new URLSearchParams(config).toString();
    const response = await fetch(`https://atlas.microsoft.com/reverseGeocode?${params}`);

    if (!response.ok) {
        logger.error({
            message: 'Error fetching city name',
            response: response
        });
        return {}
    }

    const responseBody = await response.json();
    if (responseBody.features.length === 0) {
        //TODO: Handle not detected municipality
        logger.error(`No municipality detected in location ${lat}, ${lon}`);
    }

    cityName = responseBody.features[0].properties.address.locality;
    cityCountry = responseBody.features[0].properties.address.countryRegion.name;
    formattedName = responseBody.features[0].properties.address.formattedAddress;

    return { cityName, cityCountry, formattedName }
}









export { getLocationCityPage }