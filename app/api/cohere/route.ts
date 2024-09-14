import { NextRequest, NextResponse } from "next/server";
export async function GET() {
    let response = await verySmartGoose();
    
    console.log(response);
    console.log("response");

    return NextResponse.json({ message: response.text });
}

import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "gxlx7nP2yR7pbVnsyCNhgmWkRtNJrl8HLxFZ3R4A",
});

let gradeTest = 80;

async function quoteGoose() {
   if(gradeTest<=100&&gradeTest>=80){
    const chat = await cohere.chat({
        model: "command",
        message: "Tell me a (2 sentences), motivational, epic quote from a great philosopher. Only include the quote, do not include the philosopher.",
    });
    
    // console.log(chat);
    return chat;
}
const smartGoose = (async () => {
    const chat = await cohere.chat({
        model: "command",
        message: "Tell me some sophisticated advice for studying. Use long words. One sentence long.",
    });
   
    console.log(chat);
    return chat;
})();


}




// const Goose = (async () => {
//     const chat = await cohere.chat({
//         model: "command",
//         message: "Tell me some advice for studying. One sentence long.",
//     });
    
//     console.log(chat);
// })();

// const lessSmartGoose = (async () => {
//     const chat = await cohere.chat({
//         model: "command",
//         message: "Pretend you have the vocabulary of a 3 year old. Write a short (2 to 4 words) encouraging sentence for studying.",
//     });
    
//     console.log(chat);
// })();

// const getGoose = (async () => {
//     const chat = await cohere.chat({
//         model: "command",
//         message: "Write a funny and punny name for a goose",
//     });
    
//     console.log(chat);
// })();
