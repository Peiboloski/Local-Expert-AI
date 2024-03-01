import prisma from "@/db"
import { Attraction, City } from "@prisma/client"

const getCityByBbox = async ({ northBound, southBound, eastBound, westBound }: { northBound: number, southBound: number, eastBound: number, westBound: number }) => {
    const city = prisma.city.findFirst({
        where: {
            northBound: northBound,
            southBound: southBound,
            eastBound: eastBound,
            westBound: westBound
        }
    })

    return city
}

const getCityById = async (id: number) => {
    const city = prisma.city.findFirst({
        where: {
            id: id
        }
    })

    return city
}

const getCityAttractions = async (id: number): Promise<Attraction[]> => {
    const city = await prisma.city.findFirst({
        where: {
            id: id
        },
        include: {
            attractions: true
        }
    })
    return city?.attractions || []
}

const createCity = async (city: City) => {
    const createdCity = prisma.city.create({
        data: city
    })

    return createdCity
}

const updateCityDescription = async ({ id, description }: { id: number, description: string }) => {
    const updatedCity = prisma.city.update({
        where: {
            id: id
        },
        data: {
            description: description
        }
    })

    return updatedCity
}

export {
    getCityById,
    getCityByBbox,
    getCityAttractions,
    createCity,
    updateCityDescription
}




