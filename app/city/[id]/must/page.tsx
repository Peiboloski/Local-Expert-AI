import { fetchCityAttractionsFromAzure } from "@/app/_azureMapsQueries/getAllCityAttractions";
import AttractionCard from "@/app/_components/atoms/attractionCard";
import { getCityById, getCityAttractions } from "@/app/_database/city";
import { redirect } from "next/navigation";

export default async function CitySummaryPage({ params }: { params: { id: string } }) {
    const { id } = params
    const idAsNumber = parseInt(id)
    const city = await getCityById(idAsNumber)

    if (!city) {
        //Return to /explore and remove current url from history
        redirect('/explore')
        return
    }

    let cityAttractions = await getCityAttractions(idAsNumber)
    if (!cityAttractions || cityAttractions.length === 0) {
        //Get city attractions from API
        cityAttractions = await fetchCityAttractionsFromAzure(city)
    }

    return (
        <div className={`pt-ds-48 txt-paragraph`}>
            <header className="txt-section-label">City attractions</header>
            <ul className="space-y-6 mt-6">
                {cityAttractions.map((attraction: any) => (
                    <AttractionCard
                        key={attraction.id}
                        title={attraction.name}
                        municipality={city.name}
                        country={city.country}
                    />
                ))}
            </ul>
        </div >
    )
}

