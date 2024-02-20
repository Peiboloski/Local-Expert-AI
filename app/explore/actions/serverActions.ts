'use server'

import logger from "@/logger";

const fetchNearbyAttractions = async (lat: string, lon: string) => {
    //TODO: Add error handling
    //TODO: Extract endpoint call to a service
    //TODO: Add types
    const config = {
        "api-version": '1.0',
        limit: '10',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        language: 'en',
        "opening-hours": 'nextSevenDays',
        lat: lat,
        lon: lon,
        radius: '5000',//radius in meters to the provided location
        query: 'important tourist attraction'
    };
    logger.info('Fetching nearby attractions');
    const params = new URLSearchParams(config).toString();
    const response = await fetch(`https://atlas.microsoft.com/search/poi/category/json?${params}`);
    //error handling
    if (!response.ok) {
        logger.error({
            message: 'Error fetching nearby attractions',
            response: response
        });
        return []
    }
    const nearbyAttractions = await response.json();
    return nearbyAttractions.results;
}

export { fetchNearbyAttractions }