"use client";

import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { GiGoose } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";

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
        const green = Math.floor(midterm * 2.55); // More green for higher scores
        return `rgb(${red}, ${green}, 0)`; // Always 0 for blue
    }

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Fixed Background Image */}
            <img
                src="/assets/collectionbkg.jpg"
                alt="E7 background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Content Wrapper */}
            <div className="relative z-10 flex flex-col items-center p-6 space-y-8 h-full overflow-y-auto">
                {/* Modal for displaying goose details */}
                <AnimatePresence>
                    {display && (
                        <motion.div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={closeGoose}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="relative w-96 h-72 bg-white rounded-xl shadow-lg flex flex-col items-start"
                                style={{
                                    transformOrigin: "left bottom",
                                }}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                            >
                                <button
                                    className="absolute top-4 right-4"
                                    onClick={closeGoose}
                                >
                                    <RxCross2 className="text-gray-500 hover:text-red-600 text-3xl" />
                                </button>

                                <div className="relative w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col">
                                    <div className="flex justify-start items-center px-4 py-2 bg-blue-900 text-white rounded-t-lg">
                                        <GiGoose className="text-4xl mr-2" />
                                        <span className="text-lg font-bold text-purple-300">
                                            WAD
                                        </span>
                                        <span className="text-lg font-bold">
                                            CARD
                                        </span>
                                    </div>

                                    <div className="flex flex-row items-start px-4 py-4 space-x-4">
                                        <div className="flex flex-col items-center">
                                            {/* Goose Image */}
                                            <div className="rounded-full border border-gray-300">
                                                <img
                                                    src={displayGoose.image}
                                                    alt={`${displayGoose.name} sprite`}
                                                    className="w-24 h-24 object-cover p-4"
                                                />
                                            </div>
                                            <p className="text-black text-center mt-2">
                                                University of Waddleloo
                                            </p>
                                        </div>

                                        {/* Goose Info */}
                                        <div className="flex flex-col justify-between h-full">
                                            <h2 className="text-2xl font-semibold text-gray-900 text-center">
                                                {displayGoose.name}
                                            </h2>
                                            {/* Midterm Grade */}
                                            <p
                                                className="text-5xl font-bold text-center"
                                                style={{
                                                    color: getColor(
                                                        displayGoose.midterm
                                                    ),
                                                }}
                                            >
                                                {displayGoose.midterm}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Barcode Strip for Design */}
                                    <div className="mt-auto bg-gray-800 h-8 w-full rounded-b-lg flex items-center justify-center">
                                        <div className="w-40 h-4 bg-gray-400 rounded-sm items-center flex justify-center text-sm">
                                            Undergraduate
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <GiGoose
                    className={`text-8xl z-0 text-indigo-700 mt-6 mb-4 animate-bounce`}
                />
                <h1 className={`text-5xl font-bold text-indigo-700 mb-6`}>
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
        </div>
    );
}
