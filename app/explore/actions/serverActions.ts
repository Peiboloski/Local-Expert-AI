'use server'

import { createCity, getCityByBbox } from "@/app/_database/city";
import logger from "@/logger";
import { City } from "@prisma/client";
import { redirect } from "next/navigation";
import { LocationErrors } from "./serverActionErrors";

const getLocationCityPage = async (lat: string, lon: string): Promise<void | { error: LocationErrors }> => {
    const functionName = 'getLocationCityPage';
    let cityName, cityCountry, formattedName
    let northBound, southBound, eastBound, westBound;
    let errorPromtedToTheUser = null;

    //Get city name from coordinates
    ({ cityName, cityCountry, formattedName, errorPromtedToTheUser } = await getCityNameFromCoordinates(lat, lon));
    if (errorPromtedToTheUser) {
        return {
            error: errorPromtedToTheUser
        }
    }
    //Get city bbox from coordinates
    ({ northBound, southBound, eastBound, westBound, errorPromtedToTheUser } = await getCityBboxFromFormattedName(formattedName))
    if (errorPromtedToTheUser) {
        return {
            error: errorPromtedToTheUser
        }
    }

    const city = {
        name: cityName,
        country: cityCountry,
        northBound,
        southBound,
        eastBound,
        westBound
    }

    //Check if city already exists in database
    let databaseCity;
    try {
        databaseCity = await getCityByBbox({ northBound, southBound, eastBound, westBound });
    } catch (error) {
        logger.error({
            message: `${functionName}: ${LocationErrors.ERROR_FETCHING_CITY_FROM_DATABASE}`,
            error: error
        });
        return {
            error: LocationErrors.ERROR_FETCHING_CITY_FROM_DATABASE
        }
    }


    if (!databaseCity) {
        logger.info(`${functionName}: City not found in database, creating new city`);
        //Create city in database
        try {
            databaseCity = await createCity(city as City);
        } catch (error) {
            logger.error({
                message: `${functionName}: ${LocationErrors.ERROR_CREATING_CITY_IN_DATABASE}`,
                error: error
            });
            return {
                error: LocationErrors.ERROR_CREATING_CITY_IN_DATABASE
            }
        }
    }

    //reedirect to city page
    redirect(`/city/${databaseCity.id}/summary`);
}
//Function to fetch the typical food of a given location


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
            message: LocationErrors.ERROR_FETCHING_CITY_BBOX,
            response: response
        });

        return {
            errorPromtedToTheUser: LocationErrors.ERROR_FETCHING_CITY_BBOX,
        }
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
            message: LocationErrors.ERROR_FETCHING_CITY_NAME,
            response: response
        });
        return {
            errorPromtedToTheUser: LocationErrors.ERROR_FETCHING_CITY_NAME
        }
    }

    const responseBody = await response.json();
    if (responseBody.features.length === 0) {
        //TODO: Handle not detected municipality
        logger.error(`No municipality detected in location ${lat}, ${lon}`);
        return {
            errorPromtedToTheUser: LocationErrors.NO_MUNICIPALITY_DETECTED
        }
    }

    cityName = responseBody.features[0].properties.address.locality;
    cityCountry = responseBody.features[0].properties.address.countryRegion.name;
    formattedName = responseBody.features[0].properties.address.formattedAddress;

    return { cityName, cityCountry, formattedName }
}


export { getLocationCityPage }