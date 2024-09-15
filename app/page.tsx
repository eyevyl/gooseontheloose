"use client";

import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import { GET } from "./api/fetchSighting/route";

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

    const [map, setMap] = useState(null);
    const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });
    const [initialCenter, setInitialCenter] = useState(defaultCenter); // Map's initial center
    const [gotInitialPosition, setGotInitialPosition] = useState(false);
    const [sightings, setSightings] = useState([]);

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
        const bounds = new window.google.maps.LatLngBounds(defaultCenter);
        map.fitBounds(bounds);

        setMap(map);
    }, []);

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null);
    }, []);

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

    async function getSightings() {
        try {
            const response = await fetch(`/api/fetchSighting`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const data = await response.json();
            console.log(data);
            setSightings(data);
        }
        catch (error) {
            console.error("Failed to fetch sightings:", error);
        }
        
    }

    useEffect(() => {
        getSightings();
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
                        zoom={8}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                        options={{
                            disableDefaultUI: true,
                        }}
                    >
                        {/* The marker follows the user's current position */}
                        <Marker
                            position={currentPosition}
                            icon={{
                                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                                scaledSize: new google.maps.Size(40, 40),
                            }}
                        />
                        {sightings.length > 0 ? sightings.map((sighting, index) => (
                            <Marker
                                key={sighting.id}
                                position={{ lat: sighting.latitude, lng: sighting.longitude }}
                                icon={{
                                    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                                    scaledSize: new google.maps.Size(40, 40),
                                }}
                                className={index >= 2 ? "hidden" : ""}
                            />
                        )) : <></>}
                        {}
                    </GoogleMap>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
