import prisma from "@/db"
import { Attraction, City, Food } from "@prisma/client"

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

const setMustVisitAttractions = async (cityId: number, attractions: Partial<Attraction>[]) => {
    const updatedCity = prisma.city.update({
        where: {
            id: cityId
        },
        data: {
            attractions: {
                create: attractions as Attraction[],
            }
        },
    })

    return updatedCity
}

const setCityFood = async (cityId: number, food: Partial<Food>[]) => {
    const updatedCity = prisma.city.update({
        where: {
            id: cityId
        },
        data: {
            food: {
                create: food as Food[],
            }
        },
    })

    return updatedCity
}

const getCityFood = async (id: number): Promise<Food[]> => {
    const city = await prisma.city.findFirst({
        where: {
            id: id
        },
        include: {
            food: true
        }
    })
    return city?.food || []

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
    updateCityDescription,
    setMustVisitAttractions,
    setCityFood,
    getCityFood
}




