'use server'

import { getCityDescription } from "@/app/_aiQueries"
import { updateCityDescription } from "@/app/_database/city"
import { City } from "@prisma/client"

const getAndUpdateCityDescriptionAction = async (city: City) => {
    const cityDescription = await getCityDescription({ city: city.name, country: city.country })
    await updateCityDescription({ id: city.id, description: cityDescription })
    return cityDescription
}

export { getAndUpdateCityDescriptionAction }