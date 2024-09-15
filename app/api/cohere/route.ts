import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    let response = await quoteGoose();
    console.log(response);
    console.log("response");

    return NextResponse.json({ message: response?.text});
}

import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "gxlx7nP2yR7pbVnsyCNhgmWkRtNJrl8HLxFZ3R4A",
});

let gradeTest = 20;

async function quoteGoose() {
    if (gradeTest <= 100 && gradeTest >= 80) {
        let phil = [
            "Aristotle",
            "Confucius",
            "Friedrich Nietzsche",
            "Socrates",
            "Marcus Aurelius",
            "Immanuel Kant",
            "Ralph Waldo Emerson",
            "Plato",
            "Epictetus",
            "Jean-Paul Sartre"
          ]
        const randNum = Math.trunc(Math.random()*11);
        while(1){
        const chat = await cohere.chat({
            model: "command",
            temperature: 1,
            seed: Math.trunc(Math.random()*20)+1,
            message:
                "Tell me a motivational, epic quote from a great philosopher like"+phil[randNum]+". Only include the quote, do not include the philosopher. Do not say anything else. No whitespace or \ or double quotes. Max 90 characters.",
        });
        if(chat.text.length<=100){
            return chat;
        }

        
    } 
    }else if (gradeTest >= 60) {
        while(1){
        const chat = await cohere.chat({
            model: "command",
            temperature: 1.8,
            seed: Math.trunc(Math.random()*100)+1,
            message:
                "Pretend you are an adult. Write a short sentence on advice for studying. One sentence long. No other text. Only use the advice sentence. 10 words max.",
        });
        if(chat.text.length<=100){
        return chat;
        }
    }
    } else if (gradeTest >= 40) {
        while(1){
        const chat = await cohere.chat({
            model: "command",
            temperature: 1.75,
            seed: Math.trunc(Math.random()*100)+1,    
            message:
                "You're a goose, tell me simple advice for studying while adding Honk! at the start of the small sentence. One sentence long. No other text. Only use the goose sentence. 10 words max.",
        });
        if(chat.text.length<=100){
            return chat;
        }
    }

    } else if (gradeTest < 40) {
        while(1){
        const chat = await cohere.chat({
            model: "command",
            temperature: 0.7,
            seed: Math.trunc(Math.random()*100)+1,
            message:
                "You're a 3 year old. Tell me a short (4 words maximum) encouraging sentence for studying while adding the honk sound effect in your tiny sentence. One sentence long. No other text. Only use the goose sentence.",
        });
        if(chat.text.length<=30){
            return chat;
        }
    }   
    }
}

async function getName() {
    const chatName = await cohere.chat({
        model: "command",
        temperature: 0.7,
        seed: Math.trunc(Math.random()*100)+1,
        message:
            "Write a fun name for a goose. Only output the name and nothing else. ",
    });
    if((chatName.text.length)>20){
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
            "Waddle Smiles"
        ];
        let rand = Math.floor(Math.random()*75);
        return names[rand];
    }
else{
    return chatName;
}
}
