import { NextRequest, NextResponse } from "next/server";

// https://localhost:3000/api/

export async function GET(req: NextRequest) {
    return NextResponse.json({ alive: true });
}
