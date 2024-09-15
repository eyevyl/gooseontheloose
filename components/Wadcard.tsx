import { useEffect, useState } from "react";
import { GiGoose } from "react-icons/gi";
import Faculty from "@/components/Faculty";
// import quoteGoose from "@/app/api/cohere/route";

type GooseSchema = {
    id: number;
    name: string;
    image: string;
    traitsPrompt: string;
    views: number;
    finder: string;
    midterm: number;
    final: number;
    program: string;
    quote: string;
};

export default function Wadcard({ goose }: { goose: GooseSchema }) {
    // const [quote, setQuote] = useState("");
    // useEffect(() => {
    //     async function fetchQuote() {
    //         const quote = await quoteGoose(goose.midterm);
    //         if (quote) {
    //             setQuote(quote.text);
    //         } else {
    //             setQuote("No quote found");
    //         }
    //     }
    //     fetchQuote();
    // });

    function getColour(midterm: number) {
        const red = Math.floor((100 - midterm) * 2.55);
        const green = Math.floor(midterm * 2.55);
        return `rgb(${red}, ${green}, 0)`;
    }

    return (
        <div className="relative w-full h-full bg-white border border-gray-300 rounded-lg flex flex-col">
            <div className="flex justify-start items-center px-4 py-2 bg-blue-900 text-white rounded-t-lg">
                <GiGoose className="text-4xl mr-2 z-50" />
                <span className="text-lg font-bold text-purple-300">WAD</span>
                <span className="text-lg font-bold">CARD</span>
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
                    <div className="mt-2">
                        <Faculty program={goose.program} />
                    </div>
                </div>

                {/* Goose Info */}
                <div className="flex flex-col justify-between h-full">
                    <h2 className="text-xl font-bold text-gray-900 text-center">
                        {goose.name}
                    </h2>
                    {/* Midterm Grade */}
                    <p
                        className="text-xl font-semibold text-center"
                        style={{
                            color: getColour(goose.midterm),
                        }}
                    >
                        Midterm: {goose.midterm}
                    </p>
                    <p
                        className="text-xl font-bold text-center"
                        style={{
                            color: getColour(goose.final),
                        }}
                    >
                        Final: {goose.final}
                    </p>
                    {/* <p className="text-base font-bold text-center">{}</p> */}
                    {/* <p className="text-black">{goose.quote}</p> */}
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
