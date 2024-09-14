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
    const rawB64 = await req.body;
    console.log("base" + rawB64);
    const b64 = decodeURIComponent(JSON.parse(rawB64).base64 as string);

    if (b64 === undefined) {
        return NextResponse.json({
            success: false,
            failedReason: "No image data provided",
            answer: "",
        });
    }

    
    // Getting the actual AI answer
    client.chat.completions
        .create({
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "system",
                    content: PROMPT,
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
            res.status(404).json({
                success: false,
                failedReason: reason,
                answer: "",
            });
        });
}

// return NextResponse.json({ alive: true });

// https://localhost:3000/api/gis/upload
