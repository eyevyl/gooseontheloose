import connect from "@/lib/db";
import Sighting from "@/lib/modals/sighting";

import { NextRequest, NextResponse } from "next/server";

// Adds the coordinates of a new sighting to the database

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connect(); 

        const newSighting = new Sighting(body); 
        await newSighting.save();

        return new NextResponse(
            JSON.stringify({ message: "New sighting added.", sighting: newSighting }), 
            {status: 200}
        );
    } catch (error: any) {
        return new NextResponse("Error in creating sighting" + error.message, {
            status: 500,
        });
    }
}