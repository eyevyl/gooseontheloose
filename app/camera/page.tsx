"use client";

import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 430,
    height: 932,
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
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);
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
            // not a goose
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
        }

        setProcessing(false);
    }

    return (
        <>
            <div className="w-[430px] h-[932px] overscroll-none">
                <div className="absolute w-[430px] bg-black opacity-50 h-12"></div>

                <Webcam
                    audio={false}
                    height={932}
                    screenshotFormat="image/jpeg"
                    width={430}
                    videoConstraints={videoConstraints}
                    className="w-full h-full object-cover"
                >
                    {/* @ts-ignore */}
                    {({ getScreenshot }) => (
                        <div className="absolute bottom-0 pb-28 w-[430px] p-4 flex items-center justify-center bg-black opacity-50">
                            <button
                                onClick={() => {
                                    upload(getScreenshot() as string);
                                    handleClick();
                                }}
                                className={`border-4 bg-transparent rounded-full p-8 z-50 transition-transform duration-200 ${
                                    isClicked ? "animate-click" : ""
                                }`}
                            ></button>
                        </div>
                    )}
                </Webcam>
            </div>
            {isClicked && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center"
                ></motion.div>
            )}
        </>
    );
};

export default Page;
