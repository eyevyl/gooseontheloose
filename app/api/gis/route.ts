import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: "4mb",
        },
    },
};

let idCounter = 0;

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

        await connect();
        const traitPrompts = await Goose.find({}, "id traitsPrompt");

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
                            text: "Here is a list of known gooses and their associated unique traits: " + JSON.stringify(traitPrompts),
                        },
                    ],
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

        const parsedData = JSON.parse(rawAnswer);
        console.log(parsedData);

        if (parsedData.id === 0) {
            const id = await getID();
            const midterm = await getMidterm(); 

            const newGooseData = {
                id: id,
                name: "flullk",
                traitsPrompt: parsedData.trait,
                views: 1,
                finder: "Person",
                midterm: midterm,
                final: 0,
                image: "something"
            }  
            
            const newGoose = new Goose(newGooseData);
            await newGoose.save();

            console.log("New goose created.")
        } else if (parsedData.id === -1) {
            console.log("This is not a goose.")
        } else {
            console.log("")
        }

        return NextResponse.json({
            success: true,
            data: parsedData,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            error: "AI failed to generate a response",
        });
    }
}

async function getID() {
    idCounter++; 
    return idCounter; 
} 

async function getMidterm() {
    let sum = 0;
    let result = 0;

    for (let j = 0; j < 12; j++) {
        sum += Math.random();
    }

    sum -= 6;

    let p = Math.random(); 
    
    if (p >= 0.9) {
        result = Math.floor(sum * 5 / 6 + 95);
    } else if (p >= 0.6) {
        result = Math.floor(sum * 20 / 6 + 80);
    } else {
        result = Math.floor(sum * 50 / 6 + 50);
    }

    console.log("Midterm mark generated: " + result);
    return(result);
}