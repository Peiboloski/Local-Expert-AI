import { getCityDescription } from "@/app/_aiQueries"
import { updateCityDescription } from "@/app/_database/city"
import logger from "@/logger"

const getAndUpdateCityDescription = async ({ cityName, cityId, cityCountry }: { cityName: string, cityId: number, cityCountry: string }) => {
    logger.info(`Getting and updating city description for city ${cityName} in ${cityCountry}`)
    const cityDescription = await getCityDescription({ city: cityName, country: cityCountry })
    logger.info(`Updating city description in database for city ${cityName} in ${cityCountry}`)
    await updateCityDescription({ id: cityId, description: cityDescription })
    return cityDescription
}

export { getAndUpdateCityDescription }