import { getCityById, getCityFood, setCityFood } from "@/app/_database/city";
import { redirect } from "next/navigation";
import { fetchCityMustEatFood, fetchCityMustVisitAttractions } from "@/app/_aiQueries";
import { Attraction, Food } from "@prisma/client";
import AttractionCard from "@/app/_components/molecules/AttractionCard";
import FoodCard from "@/app/_components/molecules/FoodCard";

export default async function CitySummaryPage({ params }: { params: { id: string } }) {
    const { id } = params
    const idAsNumber = parseInt(id)
    const city = await getCityById(idAsNumber)

    if (!city) {
        //Return to /explore and remove current url from history
        redirect('/explore')
        return
    }

    let cityFood: Partial<Food[]> = await getCityFood(idAsNumber)
    if (!cityFood || cityFood.length === 0) {
        //Get city attractions from API
        cityFood = await fetchCityMustEatFood({ city: city.name, country: city.country })
        await setCityFood(idAsNumber, cityFood)
    }

    return (
        <div className={`pt-ds-48 txt-paragraph`}>
            <header className="txt-section-label">Must try Meals</header>
            <ul className="space-y-6 mt-6">
                {cityFood.map((food: any) => (
                    <FoodCard
                        key={food.id}
                        title={food.name}
                        shortDescription={food.shortDescription}
                    />
                ))}
            </ul>
        </div >
    )
}

