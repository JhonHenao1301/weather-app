
function geolocationSupport() {
    return 'geolocation' in navigator
}

const defaultOptions = {
    enableHighAcurracy: true,
    timeOut: 5000,
    maximumAge: 1000000, 
}

export function getCurrentPosition(options = defaultOptions) {
    if(!geolocationSupport()) throw new Error('No hay soporte de geolocalizai{on en tu navegador')

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude            
            resolve(position)
        }, () => {
            reject('No hemos podido obtener tú ubicación')
        }, options)
    })
}

export async function getLatLon(options = defaultOptions) {
    try {
        const { coords: { latitude: lat, longitude: lon} } = await getCurrentPosition(options)
        return { lat, lon, isError: false }
    } catch {
        return { isError: true, lat: null, long: null }
    }
}