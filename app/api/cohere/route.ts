import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Hello, Next.js with TypeScript!" });
}

// export async function POST(req: NextRequest) {
//   const body = await req.json();
//   return NextResponse.json({ message: `Hello, ${body.name}!` });
// }
import { CohereClient } from "cohere-ai";
const cohere = new CohereClient({
    token: "gxlx7nP2yR7pbVnsyCNhgmWkRtNJrl8HLxFZ3R4A",
});
export async function test() {
(async () => {
    const response = await cohere.chat({
        chatHistory: [
            { role: "USER", message: "Who discovered gravity?" },
            {
                role: "CHATBOT",
                message:
                    "The man who is widely credited with discovering gravity is Sir Isaac Newton",
            },
        ],
        message: "Write a motivational philosophy quote from a famous philosopher",
        // perform web search before answering the question. You can also use your own custom connector.
        connectors: [{ id: "web-search" }],
    });
    console.log(response);
})();
}