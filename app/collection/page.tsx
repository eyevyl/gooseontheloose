"use client";

import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";
import { RxCross2 } from "react-icons/rx";
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

    return (
        <div className="flex flex-col bg-gradient-to-br from-fuchsia-200 via-pink-300 to-purple-400 w-screen h-screen items-start p">
            {display && (
                <motion.div
                    className={`w-screen h-screen bg-black opacity-50`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={closeGoose}
                    exit={{ opacity: 0 }}
                >
                    <div className="m-auto bg-white rounded-xl max-w-[400px] text-black flex-col flex">
                        <a className="ml-auto">
                            <RxCross2 className="text-cyan-900 text-3xl m-4" />
                        </a>
                        <img
                            src={displayGoose.image}
                            alt={`${displayGoose.name} sprite`}
                        />
                        <h1>{`Name: ${displayGoose.name}`}</h1>
                        <p>{`Midterm: ${displayGoose.midterm}`}</p>
                    </div>
                </motion.div>
            )}
            <div className="flex flex-col bg-white m-4 rounded-xl">
                {geese.map((goose, index) => (
                    <div
                        key={index}
                        className={
                            displayGoose
                                ? `hidden`
                                : `p-10 flex flex-row space-x-4`
                        }
                    >
                        <img
                            src={goose.image}
                            className="rounded-xl mr-auto ml-2"
                            height="120px"
                            width="120px"
                            alt={`${goose.name} sprite`}
                        />
                        <button onClick={() => openGoose(goose)}>
                            <h1 className="text-cyan-900 py-2 text-center">
                                {goose.name}
                            </h1>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
