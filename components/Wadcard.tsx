import React from 'react';
import Goose from '@/lib/modals/goose';
import { GiGoose } from 'react-icons/gi';



export default function Wadcard({ goose } : {goose: typeof Goose}) {
    function getColour(midterm: number) {
        const red = Math.floor((100 - midterm) * 2.55);
        const green = Math.floor(midterm * 2.55);
        return `rgb(${red}, ${green}, 0)`;
    }

    return (
        <div className="relative w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col">
            <div className="flex justify-start items-center px-4 py-2 bg-blue-900 text-white rounded-t-lg">
                <GiGoose className="text-4xl mr-2 z-50" />
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
                            src={goose.image}
                            alt={`${goose.name} sprite`}
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
                        {goose.name}
                    </h2>
                    {/* Midterm Grade */}
                    <p
                        className="text-5xl font-bold text-center"
                        style={{
                            color: getColour(goose.midterm),
                        }}
                    >
                        {goose.midterm}
                    </p>
                    <p className="text-black">{goose.quote}</p>
                </div>
            </div>

            {/* Barcode Strip for Design */}
            <div className="mt-auto bg-gray-800 h-8 w-full rounded-b-lg flex items-center justify-center">
                <div className="w-40 h-4 bg-gray-400 rounded-sm items-center flex justify-center text-sm">
                    Undergraduate
                </div>
            </div>
        </div>
    );
}
