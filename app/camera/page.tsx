"use client";

import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 430,
    height: 932,
    facingMode: "user",
};

type ErrorResponse = {
    error: string;
    success: boolean;
};

type SuccessResponse = {
    success: true;
    id: number;
    data: string;
};

const Page: NextPage = () => {
    const [processing, setProcessing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    async function upload(thing: string) {
        setProcessing(true);

        const res = await fetch(`/api/gis`, {
            method: "POST",
            body: JSON.stringify({
                base64: encodeURIComponent(thing),
            }),
        });
        const json: SuccessResponse | ErrorResponse = await res.json();
        const data = json.data;

        if ("error" in data) {
            console.error(data.error);
            setProcessing(false);
            return;
        }
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
                <Webcam
                    audio={false}
                    height={932}
                    screenshotFormat="image/jpeg"
                    width={430}
                    videoConstraints={videoConstraints}
                >
                    {({ getScreenshot }) => (
                        <div className="absolute bottom-20 w-[430px] p-4 flex items-center justify-center">
                            <button
                                onClick={() => {
                                    upload(getScreenshot());
                                }}
                                className="border-4 rounded-full p-8 z-50"
                            ></button>
                        </div>
                    )}
                </Webcam>
            </div>
        </>
    );
};

export default Page;
