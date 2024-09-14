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

const prompt = `You are an AI designed to tell the difference between Geese that have some unusual trait. Your job is to not only find that trait or traits but also describe that trait so given another image you can decipher if it is truly the right goose.`;

export async function POST(req: NextRequest) {
    try {
        const rawB64 = (await req.json()).base64;
        const b64 = decodeURIComponent(rawB64 as string);

        if (!b64) {
            return NextResponse.json({
                success: false,
                error: "No image data provided",
            });
        }

        console.log(process.env.NEXT_PUBLIC_BASE_URL);
        const gooseTraits = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/gooseTraits`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const traits = await gooseTraits.json();
        console.log(traits);

        const completion = await client.chat.completions.create({
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
                            text: 'Describe the unique trait of the goose you see, and what ID it is, return an ID of 0 if this goose is new. Return this in a json format in the form of {"id": int, trait: "trait"} with no other text or ```json. Some gooses may be real images, some may be plushies, some may be lego, but still define a trait. If the object or image is clearly not a goose return an id of -1.',
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
        });

        const rawAnswer = completion.choices[0].message.content as string;
        console.log(rawAnswer);

        return NextResponse.json({
            success: true,
            data: JSON.parse(rawAnswer),
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "AI failed to generate a response",
        });
    }
}
