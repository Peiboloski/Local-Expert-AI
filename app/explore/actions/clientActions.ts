'use client'
function getUserLocation() {
    const userLocationPromise = new Promise<{ lat: number, lon: number } | null>((resolve, reject) => {
        return navigator.geolocation.getCurrentPosition((position) => {
            resolve({ lat: position.coords.latitude, lon: position.coords.longitude })
        }, (error) => {
            resolve(null)
        });
    });

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