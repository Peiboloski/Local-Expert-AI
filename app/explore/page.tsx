'use client'
import Section from "../_components/atoms/section";
import { useEffect, useState } from "react";
import { getIsLocationPermissionGranted, getUserLocation, watchLocationPermissionChange } from "./actions/clientActions";
import { getLocationCityPage } from "./actions/serverActions";
import { LocationErrors } from "./actions/serverActionErrors";

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
    const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(true)
    const [userLocation, setUserLocation] = useState<{ lat: number, lon: number } | null>(null)
    const [errorFetchingCity, setErrorFetchingCity] = useState<LocationErrors | null>(null)


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

    //Set city when user location changes
    useEffect(() => {
        if (userLocation) {
            const getLocationCityPageWrapper = async () => {
                const { error = null } = await getLocationCityPage(userLocation.lat.toString(), userLocation.lon.toString()) || {}
                if (error) {
                    setErrorFetchingCity(error)
                }

            }
            getLocationCityPageWrapper();
        }
    }, [userLocation]);

    const getLocationErrorPromtedToTheUser = () => {
        switch (errorFetchingCity) {
            case LocationErrors.NO_MUNICIPALITY_DETECTED:
                return 'We can not load your location information as you are not in a municipality right now'
            default:
                return 'Error fetching city information. Try again refreshing the page.';
        }
    }




    if (!isLocationPermissionGranted) {
        return (
            <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
                <header className="txt-section-label">Nearby attractions</header>
                <p className="txt-main-text-medium pt-ds-32">Enable location permission to get nearby attractions.</p>
                <p className="txt-main-text-medium">If you don&apos;t know how <a href="https://robots.net/tech/how-do-i-enable-location-permission-in-my-browser/#google_vignette" target="_blank" className="text-ds-green-500">check this link</a></p>
            </Section>
        );
    }

    if (!userLocation) return (
        <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
            <p className="txt-main-text-medium pt-ds-32">Getting your location...</p>
        </Section>
    );

    if (errorFetchingCity) {
        return (
            <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
                <p className="txt-main-text-medium pt-ds-32">
                    {getLocationErrorPromtedToTheUser()}
                </p>
            </Section>
        );
    }


    return (
        <Section wrapperClassName="bg-ds-grey-200" className="flex flex-col p-ds-32">
            <p className="txt-main-text-medium pt-ds-32">Getting location information...</p>
        </Section>
    );
}