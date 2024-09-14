import { NextRequest, NextResponse } from "next/server";

// http://localhost:3000/api/getGoose

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Hello, Next.js with TypeScript!" });
}
