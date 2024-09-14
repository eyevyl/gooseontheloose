import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    let response = await getName();

    console.log(response);
    console.log("response");

    return NextResponse.json({ message: response.text });
}

import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "gxlx7nP2yR7pbVnsyCNhgmWkRtNJrl8HLxFZ3R4A",
});

let gradeTest = 66;

async function quoteGoose() {
    if (gradeTest <= 100 && gradeTest >= 80) {
        const chat = await cohere.chat({
            model: "command",
            message:
                "Tell me a (2 sentences), motivational, epic quote from a great philosopher. Only include the quote, do not include the philosopher. Do not say anything else.",
        });

        // console.log(chat);
        return chat;
    } else if (gradeTest >= 60) {
        const chat = await cohere.chat({
            model: "command",
            message:
                "Tell me some sophisticated advice for studying. One sentence long. No other text.",
        });

        console.log(chat);
        return chat;
    } else if (gradeTest >= 40) {
        const chat = await cohere.chat({
            model: "command",
            message:
                "You're a goose, tell me advice for studying while making goose sound effects. One sentence long. Only use the goose sentence.",
        });

        console.log(chat);
        return chat;
    } else if (gradeTest < 40) {
        const chat = await cohere.chat({
            model: "command",
            message:
                "Pretend you have the vocabulary of a 3 year old. Write a short (2 to 4 words) encouraging sentence for studying.",
        });

        console.log(chat);
        return chat;
    }
}

async function getName() {
    const chatName = await cohere.chat({
        model: "command",
        temperature: 0.5,
        seed: Math.trunc(Math.random()*10000+1),
        message:
            "Write a fun name for a goose. Only output the name and nothing else. ",
    });
    if(String(chatName).length>20){
        
    }

    console.log(chatName);
    return chatName;
}
