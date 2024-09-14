import connect from "@/lib/db";
import Sighting from "@/lib/modals/sighting";

import { NextRequest, NextResponse } from "next/server";

// Fetches the coordinates of the three most recent goose sightings 

export async function GET(req: NextRequest) {
    try {
        await connect(); 
        const recentSightings = await Sighting.find().sort({createdAt: -1}).limit(3);

        console.log("Fetched sightings: " + recentSightings);

        return new NextResponse(JSON.stringify(recentSightings), { status: 200});
    } catch (error: any) {
        return NextResponse.json("Error in fetching recent locations " + error.message, { status: 500, });
    }
}