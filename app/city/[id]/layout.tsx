import Section from "@/app/_components/atoms/section";
import { getCityById } from "@/app/_database/city"
import { redirect } from 'next/navigation';
import CityTabs from "./_components/CityTabs";

export default async function CityLoayout({ children, params }: { children: React.ReactNode, params: { id: string } }) {
    const { id } = params
    const idAsNumber = parseInt(id)

    const city = await getCityById(idAsNumber)

    if (!city) {
        //Return to /explore and remove current url from history
        redirect('/explore')
    }

    return (
        <Section className="py-ds-32">
            <div className="container mx-auto">
                <header className="txt-hero">
                    <span className="text-ds-grey-700">Welcome to <span className="text-ds-grey-900">{city.name}</span>!</span>
                </header>
                <div className="pt-ds-24">
                    <CityTabs cityId={idAsNumber} />
                </div>
                {children}
            </div>
        </Section >
    )
}

