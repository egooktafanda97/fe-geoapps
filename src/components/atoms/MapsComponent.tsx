import React from 'react'
import { GoogleMap, useJsApiLoader, LoadScript } from '@react-google-maps/api'

const containerStyle: React.CSSProperties = {
    width: '400px',
    height: '400px',
}

const center = {
    lat: -3.745,
    lng: -38.523,
}

const MapsComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyA2Vsh853F1osV25CV--0I-Kes5Zq9bVlA',
    })

    const [map, setMap] = React.useState<google.maps.Map | null>(null)

    const onLoad = React.useCallback((map: google.maps.Map) => {
        // This is just an example of getting and using the map instance!!! Don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center)
        map.fitBounds(bounds)

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(() => {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10} onLoad={onLoad} onUnmount={onUnmount}>
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    )
}

export default React.memo(MapsComponent)
