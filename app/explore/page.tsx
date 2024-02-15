import Link from "next/link";
import { ButtonLink } from "../_components/atoms/button";
import Section from "../_components/atoms/section";
import ArrowRight from "../_components/icons/small/arrowRight";

export default async function Home() {
    return (
        <div className="flex flex-col mx-auto">
            <NearbyAttractions />
        </div>
    );
}

async function NearbyAttractions() {
    const nearbyAttractions = await fetchNearbyAttractions();
    if (nearbyAttractions.length === 0) {
        return null;
    }

    return (
        <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
            <header className="txt-section-label">Nearby attractions</header>
            <ul className="space-y-6 mt-6">
                {nearbyAttractions.map((attraction: any) => (
                    <AttractionCard
                        key={attraction.id}
                        title={attraction.poi.name}
                        distance={Math.round(attraction.dist)}
                    />
                ))}
            </ul>
        </Section>
    );
}


interface AttractionCardProps {
    title: string;
    distance: number;
}
const AttractionCard = ({ title, distance }: AttractionCardProps) => {
    return (
        <li className="flex flex-col bg-ds-white p-ds-16 rounded-[8px] border border-solid border-ds-grey-700 hover:bg-ds-green-300">
            <Link href={`/explore/${title}`} className="flex flex-row justify-between items-center gap-ds-12">
                <div className="flex flex-col gap-ds-12">
                    <h2 className="txt-main-text-medium">{title}</h2>
                    <p className="txt-main-text-medium text-ds-grey-600">{`${distance} m`}</p>
                </div>
                <ArrowRight className="flex-shrink-0" />
            </Link>
        </li>
    );
};

const fetchNearbyAttractions = async () => {
    //TODO: Add error handling
    //TODO: Extract endpoint call to a service
    const config = {
        "api-version": '1.0',
        limit: '10',
        "subscription-key": process.env.AZURE_MAPS_API_KEY || '',
        language: 'en',
        "opening-hours": 'nextSevenDays',
        lat: '42.341106',
        lon: '-3.701991',
        radius: '200',//radius in meters to the provided location
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