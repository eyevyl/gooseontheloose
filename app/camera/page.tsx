"use client";

import type { NextPage } from "next";
import { useState } from "react";
import Webcam from "react-webcam";
import { AnimatePresence, motion } from "framer-motion";
import Wadcard from "@/components/Wadcard";

interface Coordinates {
    latitude: number;
    longitude: number;
}

type GooseSchema = {
    id: number;
    name: string;
    image: string;
    traitsPrompt: string;
    views: number;
    finder: string;
    midterm: number;
    final: number;
    program: string;
    quote: string;
};

const videoConstraints = {
    facingMode: ["environment", "user"],
};

type ErrorResponse = {
    error: string;
    success: boolean;
};

type SuccessResponse = {
    success: true;
    id: number;
    data: {
        id: number;
        trait: string;
    };
};

const Page: NextPage = () => {
    const [processing, setProcessing] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [notGoose, setNotGoose] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [realGoose, setRealGoose] = useState<GooseSchema | null>(null);
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

    const handleNotGoose = () => {
        setTimeout(() => setNotGoose(false), 2000);
    }

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);
    };

    const fetchLocation = (): Promise<Coordinates | null> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                console.log("Geolocation is not supported by your browser.");
                resolve(null);
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                () => {
                    console.log("Unable to retrieve your location.");
                    resolve(null);
                }
            );
        });
    };

    async function upload(thing: string) {
        setProcessing(true);

        const res = await fetch(`/api/gis`, {
            method: "POST",
            body: JSON.stringify({
                base64: encodeURIComponent(thing),
            }),
        });
        const json: SuccessResponse | ErrorResponse = await res.json();

        if ("error" in json) {
            console.error(json.error);
            setProcessing(false);
            return;
        }
        const data = json.data;
        // Goose identified

        if (data.id == -1) {
            setNotGoose(true);
            handleNotGoose();
            setProcessing(false);
            return;
        }
        console.log(data);
        console.log(data.trait);
        console.log(data.id);
        if (data.id == 0) {
            const res = await fetch(`/api/gis/generatePixels`, {
                method: "POST",
                body: JSON.stringify({
                    trait: data.trait,
                    id: data.id,
                }),
            });
            const json = await res.json();
            console.log(json);
            const otherRes = await fetch(`/api/getGoose`, {
                method: "GET",
            });
            const existingData = await otherRes.json();
            const actualGoose: GooseSchema = existingData.find(
                (goose: GooseSchema) => goose.traitsPrompt === data.trait
            );
            setRealGoose(actualGoose);
            setShowCard(true);
            const location = await fetchLocation();
            setCoordinates(location);

            // send coords to mongodb
            if (location) {
                const res1 = await fetch(`/api/addSighting`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }),
                });
                const data1 = await res1.json();
                console.log(data1);
            } else {
                console.log("No location data available.");
            }
        } else {
            // Existing Goose
            const res = await fetch(`/api/getGoose`, {
                method: "GET",
            });
            const existingData = await res.json();
            console.log(existingData);
            const actualGoose: GooseSchema = existingData.find(
                (goose: GooseSchema) => goose.id === data.id
            );
            setRealGoose(actualGoose);
            setShowCard(true);
        }
        setProcessing(false);
    }

    return (
        <>
            {/* Full screen container for webcam */}
            <div className="w-full h-screen relative bg-black">
                {/* Webcam component should touch the top of the screen */}
                <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                    className="absolute top-0 w-full h-full object-cover" // Ensures the webcam fills the screen and touches the top
                >
                    {/* @ts-ignore */}
                    {({ getScreenshot }) => (
                        <div className="absolute bottom-52 w-full p-4 flex items-center justify-center z-20">
                            {" "}
                            {/* Move the shutter button up from the bottom */}
                            <button
                                onClick={() => {
                                    const screenshot = getScreenshot();
                                    if (screenshot) {
                                        upload(screenshot);
                                        handleClick();
                                    }
                                }}
                                className={`border-4 bg-transparent rounded-full p-8 transition-transform duration-200 ${isClicked ? "animate-click" : ""
                                    }`}
                            ></button>
                        </div>
                    )}
                </Webcam>
            </div>

            {/* Click animation overlay */}
            <AnimatePresence>
                {(isClicked || processing) && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p className="text-white">Processing...</p>
                    </motion.div>
                )}
                {notGoose && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <p className="text-white">Not a goose...</p>
                    </motion.div>
                )}
                {showCard && realGoose && (
                    <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30 flex items-center justify-center"
                        onClick={() => setShowCard(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div>
                            <Wadcard goose={realGoose} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Page;
