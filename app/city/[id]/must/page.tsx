import { getCityById, getCityAttractions, setMustVisitAttractions } from "@/app/_database/city";
import { redirect } from "next/navigation";
import { fetchCityMustVisitAttractions } from "@/app/_aiQueries";
import { Attraction } from "@prisma/client";
import AttractionCard from "@/app/_components/molecules/AttractionCard";

export default async function CitySummaryPage({ params }: { params: { id: string } }) {
    const { id } = params
    const idAsNumber = parseInt(id)
    const city = await getCityById(idAsNumber)

    if (!city) {
        //Return to /explore and remove current url from history
        redirect('/explore')
        return
    }

    let cityAttractions: Partial<Attraction>[] = await getCityAttractions(idAsNumber)
    if (!cityAttractions || cityAttractions.length === 0) {
        //Get city attractions from API
        cityAttractions = await fetchCityMustVisitAttractions({ city: city.name, country: city.country })
        await setMustVisitAttractions(idAsNumber, cityAttractions)
    }

    return (
        <div className={`pt-ds-48 txt-paragraph`}>
            <header className="txt-section-label">Must Visit Attractions</header>
            <ul className="space-y-6 mt-6">
                {cityAttractions.map((attraction: any) => (
                    <AttractionCard
                        key={attraction.id}
                        title={attraction.name}
                        municipality={city.name}
                        country={city.country}
                        shortDescription={attraction.shortDescription}
                    />
                ))}
            </ul>
        </div >
    )
}

