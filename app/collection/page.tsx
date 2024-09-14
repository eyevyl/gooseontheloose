"use client";

import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect } from "react";

async function getGoose() {
    const req = await fetch("/api/getGoose");
    const json = await req.json();
    console.log(json);
    return json;
}

function GooseProfile(goose: any) {
    return (
        <div>
            <RxCross2 />
            <img src={goose.image} alt={`${goose.name} sprite`} />
            <h1>{goose.name}</h1>
            
        </div>
    );
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

    return (
        <div className="w-screen items-center grid grid-cols-3 p">
            {geese.map((goose, index) => (
                <div key={index}>
                    <h1>{goose.name}</h1>
                    <img src={goose.image} alt={`${goose.name} sprite`} />
                </div>
            ))}
        </div>
    );

}
