'use server'
import OpenAI from "openai";

interface getAssistantMessageProps {
    title: string,
    municipality: string,
    countrySecondarySubdivision: string,
    countrySubdivision: string,
    country: string
}

const getAssistantMessage = async ({ title, municipality, countrySecondarySubdivision, countrySubdivision, country }: getAssistantMessageProps) => {
    return "MOCKED ASSISTANT MESSAGE"
    const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const assistantMessage = await openAI.chat.completions.create({
        messages: [{ role: "system", content: `You are a local guide in ${municipality}, ${countrySecondarySubdivision}, ${countrySubdivision}, ${country}, give main information about ${title}` }],
        model: "gpt-3.5-turbo",
    });
    return assistantMessage.choices[0].message.content || '';
}





const fetchNearbyAttractions = async (lat: string, lon: string) => {
    //TODO: Add error handling
    //TODO: Extract endpoint call to a service
    //TODO: Add types
    const config = {
        "api-version": '1.0',
        limit: '10',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        language: 'en',
        "opening-hours": 'nextSevenDays',
        lat: lat,
        lon: lon,
        radius: '5000',//radius in meters to the provided location
        query: 'important tourist attraction'
    };
    const params = new URLSearchParams(config).toString();
    const response = await fetch(`https://atlas.microsoft.com/search/poi/category/json?${params}`);
    //error handling
    if (!response.ok) {
        return []
    }
    const nearbyAttractions = await response.json();
    return nearbyAttractions.results;
}

export { getAssistantMessage }