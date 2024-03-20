'use client'
function getUserLocation() {
    const userLocationPromise = new Promise<{ lat: number, lon: number } | null>((resolve, reject) => {

        const successCallback = (position: GeolocationPosition) => {
            resolve({ lat: position.coords.latitude, lon: position.coords.longitude });
        }

        const errorCallback = (error: GeolocationPositionError) => {
            resolve(null);
        }

        return navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            {
                enableHighAccuracy: true,
                maximumAge: 10000 //10 seconds
            }
        );
    }
    );

    return userLocationPromise;
}

async function getIsLocationPermissionGranted() {
    const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
    return permissionStatus.state === 'granted';
}

//Location Permision change detector function
function watchLocationPermissionChange(callback: (permissionGranted: boolean) => void) {
    navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        permissionStatus.onchange = () => {
            callback(permissionStatus.state === 'granted');
        }
    });
}


export { getUserLocation, getIsLocationPermissionGranted, watchLocationPermissionChange }