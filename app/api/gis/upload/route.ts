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
                failedReason: "No image data provided",
                answer: "",
            });
        }

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
                            text: "Describe the unique trait of the goose you see, which id is this goose. Return this in a json format in the form of {id: 1, trait: 'trait'} with no other text or ```json. Some gooses may be real images, some may be plushies, some may be lego, but still define a trait, unless you wanna say it's made of lego.",
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

        return NextResponse.json({ success: true, message: rawAnswer });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            failedReason: "AI failed to generate a response",
            answer: "",
        });
    }
}
