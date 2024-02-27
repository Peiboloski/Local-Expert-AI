import { getCityDescription } from "@/app/_aiQueries";
import { getCityById, updateCityDescription } from "@/app/_database/city";
import DOMPurify from "isomorphic-dompurify";
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

    if (!city?.description) {
        //Get city description from AI
        city.description = await getCityDescription({ city: city.name, country: city.country })
        await updateCityDescription({ id: city.id, description: city.description })
    }

    // Sanitize the incoming HTML string
    const sanitizedHtml = DOMPurify.sanitize(city.description as string);

    // Now safely set the sanitized HTML
    const createMarkup = () => ({ __html: sanitizedHtml });

    return (
        <div className={`pt-ds-48 txt-paragraph`}>
            <div className="rich-text-injected-styles" dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}

