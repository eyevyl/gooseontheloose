import connect from "@/lib/db";
import Goose from "@/lib/modals/goose";

import { NextRequest, NextResponse } from "next/server";

let idCounter = 0;

// http://localhost:3000/api/getGoose

// Gets all geese from the database

export async function POST(req: NextRequest) {
    try {
        await connect();
        const body = await req.json();
        const incrementID = body;

        const geese = await Goose.findOne({id: incrementID});
        geese.views += 1;
        await geese.save();
        return new NextResponse(JSON.stringify(geese), { status: 200 });
    } catch (error: any) {
        return NextResponse.json("Error in incrementing geese" + error.message, {
            status: 500,
        });
    }
}
