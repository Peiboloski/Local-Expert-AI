'use server'

import { createCity, getCityByBbox } from "@/app/_database/city";
import logger from "@/logger";
import { City, Attraction } from "@prisma/client";
import * as turf from 'turf';

const fetchCityAttractionsFromAzure = async (city: City): Promise<Attraction[]> => {

    const { northBound: north, southBound: south, eastBound: east, westBound: west } = city;
    const chunks = getBoundingBoxChunks({ north, south, east, west });

    logger.info(`Fetching city attractions from Azure for city ${city.name}`);
    let attractions: Attraction[] = [];

    for (const chunk of chunks) {
        logger.info(`Fetching city attractions from Azure for city ${city.name} and chunk ${chunks.indexOf(chunk) + 1} of ${chunks.length}`);

        const { north, south, east, west } = chunk;
        const config = {
            "api-version": '1.0',
            "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
            language: 'en',
            "openingHours": 'nextSevenDays',
            'limit': '100',
            query: 'important tourist attraction',
            topLeft: [north, west].join(','),
            btmRight: [south, east].join(','),
        };

        const params = new URLSearchParams(config).toString();
        const response = await fetch(`https://atlas.microsoft.com/search/poi/category/json?${params}`);

        if (!response.ok) {
            logger.error({
                message: `Error fetching city attractions from Azure for city ${city.name} and chunk ${chunks.indexOf(chunk) + 1} of ${chunks.length}`,
                response: response
            });
            // Return fetchCityAttractionsFromAzure function with an empty array
            return [];
        }

        const responseJson = await response.json();
        console.log("responseJson", responseJson.summary)

        const chunkProcessedAttractions = (await response.json()).results.map((attraction: any) => {
            return {
                name: attraction.poi.name,
                id: attraction.id,
                cityId: city.id,
                latitude: attraction.position.lat,
                longitude: attraction.position.lon,
                topLeft: attraction.viewport.topLeftPoint,
                bottomRight: attraction.viewport.bottomRightPoint,
            }
        })


        console.log("", chunkProcessedAttractions.length)
        attractions = attractions.concat(chunkProcessedAttractions);
    }

    return attractions;
}


const getBoundingBoxChunks = ({ north, south, east, west }: { north: number, south: number, east: number, west: number }) => {
    const MAX_CHUNK_SIZE = 100000; // Maximum chunk size in meters

    // Create points for each corner of the bounding box
    const topLeft = turf.point([west, north]);
    const topRight = turf.point([east, north]);
    const bottomLeft = turf.point([west, south]);

    // Calculate distances between points in meters
    const latDistance = turf.distance(topLeft, bottomLeft, 'meters');
    const lonDistance = turf.distance(topLeft, topRight, 'meters');

    // Determine the number of chunks needed in each direction
    const latChunks = Math.ceil(latDistance / MAX_CHUNK_SIZE);
    const lonChunks = Math.ceil(lonDistance / MAX_CHUNK_SIZE);

    // Calculate the size of each step in degrees for latitude and longitude
    // Note: These steps are initially calculated as if each chunk is of equal size in degrees
    let latStep = (north - south) / latChunks;
    let lonStep = (east - west) / lonChunks;

    const chunks = [];

    for (let i = 0; i < latChunks; i++) {
        for (let j = 0; j < lonChunks; j++) {
            // Calculate the actual boundaries of each chunk, adjusting for the last chunk
            const chunkNorth = north - latStep * i;
            const chunkSouth = i === latChunks - 1 ? south : chunkNorth - latStep; // Adjust for last latitude chunk
            const chunkWest = west + lonStep * j;
            const chunkEast = j === lonChunks - 1 ? east : chunkWest + lonStep; // Adjust for last longitude chunk

            chunks.push({
                north: chunkNorth,
                south: chunkSouth,
                east: chunkEast,
                west: chunkWest
            });
        }
    }

    return chunks;
}







export { fetchCityAttractionsFromAzure }