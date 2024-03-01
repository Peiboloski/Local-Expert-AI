import Link from "next/link";
import ArrowRight from "../../icons/small/arrowRight";

interface AttractionCardProps {
    title: string;
    distance?: number;
    municipality: string;
    countrySecondarySubdivision?: string;
    countrySubdivision?: string;
    country: string;
}
const AttractionCard = ({ title, distance, municipality, countrySecondarySubdivision, countrySubdivision, country }: AttractionCardProps) => {

    const UrlParams = new URLSearchParams({
        title,
        distance: distance?.toString() || '',
        municipality,
        countrySecondarySubdivision: countrySecondarySubdivision || '',
        countrySubdivision: countrySubdivision || '',
        country
    });

    return (
        <li className="flex flex-col bg-ds-white p-ds-16 rounded-[8px] border border-solid border-ds-grey-700 hover:bg-ds-green-300">
            <Link href={`/chat?${UrlParams.toString()}`} className="flex flex-row justify-between items-center gap-ds-12">
                <div className="flex flex-col gap-ds-12">
                    <h2 className="txt-main-text-medium">{title}</h2>
                    <p className="txt-main-text-medium text-ds-grey-600">{`${distance} m`}</p>
                </div>
                <ArrowRight className="flex-shrink-0" />
            </Link>
        </li>
    );
};

export default AttractionCard;
