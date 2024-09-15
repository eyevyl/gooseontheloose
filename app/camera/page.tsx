"use client";

import type { NextPage } from "next";
import { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    facingMode: "environment", // Use rear camera by default
};

const Page: NextPage = () => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);
    };

    async function upload(thing: string) {
        console.log("Uploading screenshot...");

        const res = await fetch(`/api/gis`, {
            method: "POST",
            body: JSON.stringify({
                base64: encodeURIComponent(thing),
            }),
        });
        const json = await res.json();

        console.log("Response from API:", json);
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
                        <div className="absolute bottom-30 w-full p-4 flex items-center justify-center z-20"> {/* Move the shutter button up from the bottom */}
                            <button
                                onClick={() => {
                                    const screenshot = getScreenshot();
                                    if (screenshot) {
                                        upload(screenshot);
                                        handleClick();
                                    }
                                }}
                                className={`border-4 bg-transparent rounded-full p-8 transition-transform duration-200 ${
                                    isClicked ? "animate-click" : ""
                                }`}
                            ></button>
                        </div>
                    )}
                </Webcam>
            </div>

            {/* Click animation overlay */}
            {isClicked && (
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-30 flex items-center justify-center">
                    <p className="text-white">Processing...</p>
                </div>
            )}
        </>
    );
};

export default Page;
