import OpenAI from "openai";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { trait } = body;
        console.log(body);

        if (!trait) {
            return NextResponse.json(
                { message: "Trait is required" },
                { status: 400 }
            );
        }

        const prompt = `Generate a gameish canadian goose pixel art image with the distinct trait of: ${trait} with a red ribbon`;

        const imageResponse = await client.images.generate({
            prompt,
            n: 1,
            size: "512x512",
        });

        const generatedImageUrl = imageResponse.data[0].url;

        const imageResponseBuffer = await axios.get(generatedImageUrl, {
            responseType: "arraybuffer",
        });
        const imageBase64 = Buffer.from(imageResponseBuffer.data).toString(
            "base64"
        );

        const imgurResponse = await axios.post(
            "https://api.imgur.com/3/image",
            {
                image: imageBase64,
                type: "base64",
            },
            {
                headers: {
                    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                },
            }
        );

        const imgurUrl = imgurResponse.data.data.link;

        const gooseData = {
            image: imgurUrl,
        };

        const sendGooseData = await fetch("http://localhost:3001/api/gis", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(gooseData),
        });

        return NextResponse.json({ success: true, imgurUrl });
    } catch (error: any) {
        console.error("Error generating image or uploading to Imgur:", error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
