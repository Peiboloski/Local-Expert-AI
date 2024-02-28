'use client'
import Link from "next/link";
import Section from "../_components/atoms/section";
import ArrowRight from "../_components/icons/small/arrowRight";
import { useEffect, useState } from "react";
import { getIsLocationPermissionGranted, getUserLocation, watchLocationPermissionChange } from "./actions/clientActions";
import { fetchNearbyAttractions } from "./actions/serverActions";
import { watch } from "fs";

export default function Page() {
    return (
        <div className="flex flex-col mx-auto">
            <Explore />
        </div>
    );
}

function Explore() {
    //TODO: Handle the case when geolocation is not supported by the browser
    //todo: Check warning, violation only request geolocalitation in response to user gesture
    //Add loading state
    const [nearbyAttractions, setNearbyAttractions] = useState<null | []>(null)
    const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(true)
    const [userLocation, setUserLocation] = useState<{ lat: number, lon: number } | null>(null)


    //Get user location when component mounts
    useEffect(() => {
        const checkLocationPermission = async () => {
            const permissionGranted = await getIsLocationPermissionGranted();
            setIsLocationPermissionGranted(permissionGranted);
            watchLocationPermissionChange((permissionGranted) => {
                setIsLocationPermissionGranted(permissionGranted);
                getUserLocation().then((location) => {
                    setUserLocation(location);
                }
                );
            }
            );
        }

        checkLocationPermission();

        getUserLocation().then((location) => {
            setUserLocation(location);
        });
    }, []);


    //Fetch nearby attractions when user location changes
    useEffect(() => {
        if (userLocation) {
            const fetchNearbyAttractionsAsync = async () => {
                const attractions = await fetchNearbyAttractions(userLocation.lat.toString(), userLocation.lon.toString());
                setNearbyAttractions(attractions);
            }
            fetchNearbyAttractionsAsync();
        }
    }, [userLocation]);


    if (!isLocationPermissionGranted) {
        return (
            <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
                <header className="txt-section-label">Nearby attractions</header>
                <p className="txt-main-text-medium pt-ds-32">Enable location permission to get nearby attractions.</p>
                <p className="txt-main-text-medium">If you don&apos;t know how <a href="https://robots.net/tech/how-do-i-enable-location-permission-in-my-browser/#google_vignette" target="_blank" className="text-ds-green-500">check this link</a></p>
            </Section>
        );
    }

    if (nearbyAttractions !== null && nearbyAttractions.length === 0) {
        return (
            <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
                <header className="txt-section-label">Nearby attractions</header>
                <p className="txt-main-text-medium pt-ds-32">No nearby attractions found</p>
            </Section>
        );
    }

    if (!nearbyAttractions) {
        return (
            <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
                <header className="txt-section-label">Nearby attractions</header>
                <p className="txt-main-text-medium pt-ds-32">Loading...</p>
            </Section>
        );
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
                        municipality={attraction.address.municipality}
                        countrySecondarySubdivision={attraction.address.countrySecondarySubdivision}
                        countrySubdivision={attraction.address.countrySubdivision}
                        country={attraction.address.country}
                    />
                ))}
            </ul>
        </Section>
    );
}


interface AttractionCardProps {
    title: string;
    distance: number;
    municipality: string;
    countrySecondarySubdivision: string;
    countrySubdivision: string;
    country: string;
}
const AttractionCard = ({ title, distance, municipality, countrySecondarySubdivision, countrySubdivision, country }: AttractionCardProps) => {

    const UrlParams = new URLSearchParams({
        title: title,
        municipality: municipality,
        countrySecondarySubdivision: countrySecondarySubdivision,
        countrySubdivision: countrySubdivision,
        country: country
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