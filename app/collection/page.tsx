"use client";

import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";
import { RxCross2 } from "react-icons/rx";
import { GiGoose } from "react-icons/gi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

async function getGoose() {
    const req = await fetch("/api/getGoose");
    const json = await req.json();
    console.log(json);
    return json;
}

export default function Collection() {
    const [geese, setGeese] = useState<any[]>([]);

    useEffect(() => {
        async function fetchGeese() {
            const gooseData = await getGoose();
            setGeese(gooseData);
        }
        fetchGeese();
    }, []);

    const [display, setDisplay] = useState<boolean>(false);
    const [displayGoose, setDisplayGoose] = useState<any>(null);

    function closeGoose() {
        setDisplay(false);
        setDisplayGoose(null);
    }

    function openGoose(goose: any) {
        setDisplay(true);
        setDisplayGoose(goose);
    }

    // Function to calculate the color based on the midterm score
    function getColor(midterm: number) {
        const red = Math.floor((100 - midterm) * 2.55); // More red for lower scores
        const green = Math.floor(midterm * 2.55);       // More green for higher scores
        return `rgb(${red}, ${green}, 0)`;              // Always 0 for blue
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-fuchsia-100 via-purple-200 to-indigo-300 w-screen h-screen items-center justify-center p-6 space-y-8">
            {/* Modal for displaying goose details */}
            {display && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={closeGoose}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative p-8 bg-white rounded-3xl shadow-lg max-w-lg w-full flex flex-col items-center"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        <button className="absolute top-4 right-4" onClick={closeGoose}>
                            <RxCross2 className="text-gray-500 hover:text-red-600 text-3xl" />
                        </button>
                        <img
                            src={displayGoose.image}
                            alt={`${displayGoose.name} sprite`}
                            className="w-24 h-24 object-contain mb-4"
                        />
                        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                            {displayGoose.name}
                        </h1>
                        
                        {/* Midterm Grade */}
                        <p
                            className="text-7xl font-bold mb-4"
                            style={{ color: getColor(displayGoose.midterm) }}
                        >
                            {displayGoose.midterm}
                        </p>
                    </motion.div>
                </motion.div>
            )}

            <GiGoose className={!display ? `text-8xl text-indigo-700 mb-4 animate-bounce` : `hidden`} />
            <h1 className={!display ? `text-5xl font-bold text-indigo-700 mb-6` : `hidden`}>
                Goose Collection
            </h1>

            {/* Collection of Geese */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                {geese.map((goose, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="p-6 bg-white rounded-3xl shadow-md hover:shadow-lg cursor-pointer flex items-center space-x-6"
                        onClick={() => openGoose(goose)}
                    >
                        <img
                            src={goose.image}
                            alt={`${goose.name} sprite`}
                            className="rounded-full w-16 h-16 object-cover"
                        />
                        <h1 className="text-xl font-medium text-indigo-700">
                            {goose.name}
                        </h1>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
