import { Card, CardDescription, CardDistance, CardTitle } from "../../atoms/attractionCard";

interface AttractionCardProps {
    title: string;
    distance?: number;
    municipality: string;
    countrySecondarySubdivision?: string;
    countrySubdivision?: string;
    country: string;
    shortDescription?: string;
}
const AttractionCard = ({ title, distance, shortDescription, municipality, countrySecondarySubdivision, countrySubdivision, country }: AttractionCardProps) => {

    const UrlParams = new URLSearchParams({
        title,
        distance: distance?.toString() || '',
        municipality,
        countrySecondarySubdivision: countrySecondarySubdivision || '',
        countrySubdivision: countrySubdivision || '',
        country
    });

    return (
        <Card link={`/chat?${UrlParams}`}>
            <CardTitle title={title} />
            {shortDescription && <CardDescription description={shortDescription} />}
            {distance && <CardDistance distance={distance} />}
        </Card>
    );
};

export default AttractionCard;
