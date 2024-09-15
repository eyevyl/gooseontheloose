import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    // let response = quoteGoose(86);
    let response = "ok"
    console.log(response);
    console.log("response");

    return NextResponse.json({ message: response });
}

import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "vXgcspBSTmIWJv5fddeS66xe5rOSWmNMAGYz7I5f",
});


async function getName() {
    const chatName = await cohere.chat({
        model: "command",
        temperature: 0.7,
        seed: Math.trunc(Math.random() * 100) + 1,
        maxTokens: 30,
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
        return chatName;
    }
}
