import Link from "next/link";
import { ButtonLink } from "../_components/atoms/button";
import Section from "../_components/atoms/section";
import ArrowRight from "../_components/icons/small/arrowRight";

export default function Home() {
    return (
        <div className="flex flex-col mx-auto">
            <NearbyAttractions />
        </div>
    );
}

function NearbyAttractions() {
    return (
        <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
            <header className="txt-section-label">Nearby attractions</header>
            <ul className="space-y-6 mt-6">
                <AttractionCard title="Catedral de Burgos" distance="50m" />
                <AttractionCard title="Museo de la Evolución Humana" distance="100m" />
                <AttractionCard title="Cartuja de Miraflores" distance="200m" />
            </ul>
        </Section>
    );
}


interface AttractionCardProps {
    title: string;
    distance: string;
}
const AttractionCard = ({ title, distance }: AttractionCardProps) => {
    return (
        <li className="flex flex-col bg-ds-white p-ds-16 rounded-[8px] border border-solid border-ds-grey-700 hover:bg-ds-green-300">
            <Link href={`/explore/${title}`} className="flex flex-row justify-between items-center gap-ds-12">
                <div className="flex flex-col gap-ds-12">
                    <h2 className="txt-main-text-medium">{title}</h2>
                    <p className="txt-main-text-medium text-ds-grey-600">{distance}</p>
                </div>
                <ArrowRight />
            </Link>
        </li>
    );
};