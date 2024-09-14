"use client";

import type { NextPage } from "next";
import { motion } from "framer-motion";
import { useState } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa6";

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
    result: string;
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

        const data: SuccessResponse | ErrorResponse = await res.json();

        if ("error" in data) {
            console.error(data.error);
            setProcessing(false);
            return;
        }
        // Goose identified

        if (false) {

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
                        <button
                            onClick={() => {
                                upload(getScreenshot());
                            }}
                            className="border-2 rounded-full p-2 scale-150 bottom-10 absolute left-[47vw] z-50"
                        >
                            <FaCamera className="text-white"/>
                        </button>
                    )}
                </Webcam>
            </div>
        </>
    );
};

export default Page;
