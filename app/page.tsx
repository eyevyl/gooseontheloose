"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";

const containerStyle = {
    width: "100%",
    height: "100vh",
};

const center = {
    lat: 0, // Default latitude
    lng: 0, // Default longitude
};

export default function MyMap() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAPKEY as string,
    });

    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

    // Function to update the user's location
    const updatePosition = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });

        if (map) {
            map.panTo({ lat: latitude, lng: longitude });
        }
    };

    // Start watching the user's location in real-time
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

            return () => navigator.geolocation.clearWatch(watchId); // Clean up
        }
    }, [map]);

    // Load map and set bounds based on the user's current location
    const onLoad = useCallback((map: google.maps.Map) => {
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    return (
        <div>
            <Navbar />

            {isLoaded ? (
                <div className="-z-10 h-[932px] w-[430px]">
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={currentPosition} // Set the initial center as the current position
                        zoom={14}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            disableDefaultUI: true,
                        }}
                    >
                        <Marker position={currentPosition} />
                    </GoogleMap>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
