import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "4mb",
        },
    },
};

const client = new OpenAI();

const prompt = `You are an assistant that will generate a description of stuff you see`;

export async function POST(req: NextRequest) {
    const rawB64 = (await req.json()).base64;
    const b64 = decodeURIComponent(rawB64 as string);
    

    if (b64 === undefined) {
        return NextResponse.json({
            success: false,
            failedReason: "No image data provided",
            answer: "",
        });
    }

    client.chat.completions
        .create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: "Describe the text you see.",
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: b64,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 1000,
        })
        .then((completion) => {
            const rawAnswer = completion.choices[0].message.content as string;

            console.log(rawAnswer);
            return NextResponse.json({ message: `${rawAnswer}!` });
        })
        .catch((reason) => {
            console.error(reason);
            return NextResponse.json({
                success: false,
                failedReason: "AI failed to generate a response",
                answer: "",
            });
        });
}

// return NextResponse.json({ alive: true });

// https://localhost:3000/api/gis/upload
