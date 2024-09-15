import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";

// export const config = {
//     api: {
//         bodyParser: {
//             sizeLimit: "4mb",
//         },
//     },
// };

//let idCounter = 0;

const client = new OpenAI();

import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "gxlx7nP2yR7pbVnsyCNhgmWkRtNJrl8HLxFZ3R4A",
});


async function getName() {
    const chatName = await cohere.chat({
        model: "command",
        temperature: 0.7,
        seed: Math.trunc(Math.random() * 100) + 1,
        message:
            "Write a fun name for a goose. Only output the name and nothing else. ",
    });
    if (chatName.text.length > 20) {
        const names = [
            "Goose Willis",
            "Quack McDuck",
            "Feather Locklear",
            "Waddle White",
            "Gander the Great",
            "Wing Crosby",
            "Quacklyn Monroe",
            "Sir Waddlesworth",
            "Flap Jackson",
            "Quack Efron",
            "Goose N. Juice",
            "Feathers McGraw",
            "Waddle Dearest",
            "Bill Murr",
            "Feather Fawcett",
            "Wingston Churchill",
            "Gander Man",
            "Quacko Bello",
            "Goosey Lou",
            "Feather McFly",
            "Waddle Up",
            "Quack Sparrow",
            "Wingy Nelson",
            "Gander the Fuzz",
            "Feather Flicker",
            "Quacko the Clown",
            "Goose Van Halen",
            "Waddle Wiggins",
            "Flap Flap Fenton",
            "Feather Fling",
            "Wingman Smith",
            "Quack Levine",
            "Goosey Malone",
            "Feather Fuzz",
            "Waddle Jagger",
            "Quackzilla",
            "Winged Wonder",
            "Gander Wrench",
            "Feather Potter",
            "Goosey Boosy",
            "Waddleberry Finn",
            "Featherface",
            "Wingy McQuack",
            "Goose Harmony",
            "Quacknificent",
            "Feather Dandy",
            "Waddle Rockstar",
            "Ganderous",
            "Wingy Smiles",
            "Feather Frenzy",
            "Goose McJolly",
            "Quackster",
            "Feather Spark",
            "Waddle Wizard",
            "Gander Buzz",
            "Wingster Quack",
            "Feather Glow",
            "Goosey Jingle",
            "Quackaroo",
            "Feather Shimmer",
            "Waddle Fun",
            "Gander Delight",
            "Feather Glee",
            "Winged Joy",
            "Goose McGlow",
            "Quackster Smile",
            "Feather Pop",
            "Waddle Cheer",
            "Gander Smirk",
            "Feather Zing",
            "Winged Delight",
            "Goose McCharm",
            "Quackaroo Fun",
            "Feather Bliss",
            "Waddle Glow",
            "Gander Gleeful",
            "Quackster Gleam",
            "Feather Cheer",
            "Wingy Delight",
            "Goosey Spark",
            "Quackaroo Smiles",
            "Feather Twinkle",
            "Waddle Spark",
            "Gander Glee",
            "Quackster Joy",
            "Feather Glow",
            "Winged Spark",
            "Goose McGlee",
            "Quackaroo Joy",
            "Feather Buzz",
            "Waddle Smiles",
        ];
        let rand = Math.floor(Math.random() * 75);
        return names[rand];
    } else {
        return chatName.text.replaceAll('"', '');
    }
}


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
            const funnyName = await getName();
            const program = await getProgram();

            const newGooseData = {
                id: id,
                name: funnyName,
                traitsPrompt: parsedData.trait,
                views: 1,
                finder: "Hacker",
                midterm: midterm,
                final: midterm,
                image: "https://i.imgur.com/3EdNkjH.png",
                program: program,
            }  
            
            const newGoose = new Goose(newGooseData);
            await newGoose.save();

            console.log("New goose created.")

            // Fetch all entries
            const allEntries = await Goose.find({});

        
            for (const entry of allEntries) {
                let entryFinal = entry.final;
                const increase = Math.floor(midterm * (100 - entryFinal) / 10000);
                entryFinal += increase; 

                await Goose.updateMany(
                    { id: entry.id },  
                    { $set: { final: entryFinal } }  
                );
            }

        } else if (parsedData.id === -1) {
            console.log("This is not a goose.")
        } else {
            console.log("This goose has been found before.");
            
            console.log("This goose has been found before.");
            const goose = await Goose.findOne(
                { traitsPrompt : parsedData.trait},
            );

            const views = goose.views+1; 

            const gooseUpdate = await Goose.findOneAndUpdate(
                { traitsPrompt : parsedData.trait},
                { $set: { views: views } },
                { new: true},
            );

            console.log("Goose Updated: ", gooseUpdate);
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
    return Math.floor(Math.random() * 9999999 + 10000000); 
} 

async function getProgram() {
    const programs = ["Mathematics", "Engineering", "Health", "Science", "Environment", "Arts"];
    const index = Math.floor(Math.random()*5+1);
    return programs[index];
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