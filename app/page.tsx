"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

// Default center (somewhere neutral if initial geolocation isn't found yet)
const defaultCenter = {
    lat: 43.472792, // Default latitude
    lng: -80.539621, // Default longitude
};

export default function Map() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPKEY as string,
    });

    const [map, setMap] = useState(null)
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
    const [initialCenter, setInitialCenter] = useState(defaultCenter); // Map's initial center
    const [gotInitialPosition, setGotInitialPosition] = useState(false);

    // Function to update the user's location without moving the map center
    const updatePosition = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;

        // Set initial center only once (when the user first loads the page)
        if (!gotInitialPosition) {
            setInitialCenter({ lat: latitude, lng: longitude });
            setGotInitialPosition(true);
        }

        // Update marker's position with real-time user location
        setCurrentPosition({ lat: latitude, lng: longitude });
    };

    const onLoad = useCallback(function callback(map: any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
    
      const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
      }, [])

    // Watch the user's location in real-time, but do not move the map center after the first position
    useEffect(() => {
        if (navigator.geolocation) {
            const watchId = navigator.geolocation.watchPosition(
                updatePosition,
                (error) => {
                    console.error("Error watching position:", error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );

            return () => navigator.geolocation.clearWatch(watchId); // Clean up watcher on unmount
        }
    }, []);


    return (
        <div>
            <Navbar />

            {isLoaded ? (
                <div className="-z-10 h-[932px] w-[430px]">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        // Only use the initial center and don't change it on subsequent updates
                        center={defaultCenter} 
                        zoom={14}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            disableDefaultUI: true,
                        }}
                    >
                        {/* The marker follows the user's current position */}
                        <Marker position={currentPosition} />
                    </GoogleMap>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
