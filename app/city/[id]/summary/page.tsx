import { getCityById } from "@/app/_database/city";
import { redirect } from "next/navigation";
import Summary from "./_components/Summary";

export default async function CitySummaryPage({ params }: { params: { id: string } }) {
    const { id } = params
    const idAsNumber = parseInt(id)
    const city = await getCityById(idAsNumber)

    if (!city) {
        //Return to /explore and remove current url from history
        redirect('/explore')
    }

    return (
        <Summary city={city} />
    )
}

