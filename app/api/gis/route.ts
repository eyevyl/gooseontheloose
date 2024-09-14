import OpenAI from "openai";

import { NextRequest, NextResponse } from "next/server";

// https://localhost:3000/api/gis/upload

export async function GET(req: NextRequest) {
    return NextResponse.json({ alive: true });
}
