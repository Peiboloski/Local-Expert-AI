'use client'

import DOMPurify from "isomorphic-dompurify";
import { City } from "@prisma/client";
import { trpc } from "@/app/_trpc/client";


//This component is extracted to fetch the city description using a server action since the static page generator timeout in Vercel
//is 10 seconds and fetching the city description takes more than 10 seconds
const Summary = ({ city }: { city: City }) => {

    const { data: cityDescription } = trpc.getCitySummary.useQuery({
        cityName: city.name,
        cityId: city.id,
        cityCountry: city.country
    }, {
        initialData: city.description || '',
        enabled: !city.description,

    })

    // Sanitize the incoming HTML string
    const sanitizedHtml = DOMPurify.sanitize(cityDescription as string);

    // Now safely set the sanitized HTML
    const createMarkup = () => ({ __html: sanitizedHtml });

    if (!cityDescription) {
        return (<div className={`pt-ds-48 txt-paragraph`}>
            <div className="rich-text-injected-styles">Loading city summary...</div>
        </div>)
    }


    return (
        <div className={`pt-ds-48 txt-paragraph`}>
            <div className="rich-text-injected-styles" dangerouslySetInnerHTML={createMarkup()} />
        </div>
    )
}

export default Summary