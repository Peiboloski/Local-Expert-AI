import prisma from "@/db"
import { City } from "@prisma/client"

const getCityByBbox = async (bbox: []) => {
    const city = prisma.city.findFirst({
        where: {
            bbox: {
                hasEvery: bbox
            }
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
    createCity,
    updateCityDescription
}




