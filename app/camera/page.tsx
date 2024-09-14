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

const Page: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Processing the image into a base64 string
    const [base64, setBase64] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [text, setText] = useState<string | null>(null);

    async function upload(thing: string) {
        console.log("thing\n" + thing);

        const res = await fetch(`/api/gis/upload`, {
            method: "POST",
            body: JSON.stringify({
                base64: encodeURIComponent(thing),
            }),
        });

        const data = await res.json();

        setText(data.message);
    }

    return (
        <>
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
                        className="border-2 border-white rounded-xl m-4 py-2 px-4"
                    >
                        Capture photo
                    </button>
                )}
            </Webcam>
            <h1>
                {imageSrc ? (
                    <img src={imageSrc} alt="captured" />
                ) : (
                    <div>No image</div>
                )}
            </h1>
            <h1>{text ? <div>{text}</div> : <div>No text</div>}</h1>
        </>
    );
};

export default Page;
